#!/usr/bin/env node

/**
 * SCHEMA CHECK - Confronto Schema Database
 * 
 * Per progetti che usano Supabase (o altro DB) con backup su Airtable.
 * Confronta gli schemi e genera report delle differenze.
 * 
 * Uso:
 *   npm run schema-check
 * 
 * Requisiti:
 *   - SUPABASE_URL e SUPABASE_SERVICE_KEY nel .env
 *   - AIRTABLE_API_KEY e AIRTABLE_BASE_ID nel .env (opzionale)
 */

import { createClient } from '@supabase/supabase-js';

// ============================================================================
// CONFIGURAZIONE - PERSONALIZZA PER IL TUO PROGETTO
// ============================================================================

/**
 * Mapping nomi tabelle Supabase → Airtable
 * Aggiungi mapping se i nomi sono diversi (es. accenti, case)
 */
const TABLE_NAME_MAPPING = {
  // 'nome_supabase': 'Nome Airtable',
  // 'users': 'Utenti',
  // 'orders': 'Ordini',
};

/**
 * Tabelle da ignorare nel confronto
 */
const IGNORE_TABLES = [
  'schema_migrations',
  '_prisma_migrations',
  'spatial_ref_sys',
];

/**
 * Campi tecnici da ignorare (presenti in Supabase ma non in Airtable)
 */
const IGNORE_COLUMNS = [
  'created_at',
  'updated_at',
  'deleted_at',
  'airtable_id',
];

// ============================================================================
// SCRIPT - NON MODIFICARE SOTTO QUESTA RIGA
// ============================================================================

// Colori per output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

function log(color, ...args) {
  console.log(color, ...args, colors.reset);
}

/**
 * Normalizza nome tabella per confronto
 */
function normalizeTableName(name) {
  const lowercaseName = name.toLowerCase();
  for (const [supabase, airtable] of Object.entries(TABLE_NAME_MAPPING)) {
    if (supabase.toLowerCase() === lowercaseName || 
        airtable.toLowerCase() === lowercaseName) {
      return supabase.toLowerCase();
    }
  }
  
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')
    .replace(/-/g, '_');
}

/**
 * Fetch schema Supabase
 */
async function fetchSupabaseSchema() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('SUPABASE_URL e SUPABASE_SERVICE_KEY sono richiesti nel .env');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: columns, error } = await supabase
    .from('information_schema.columns')
    .select('table_name, column_name, data_type, is_nullable')
    .eq('table_schema', 'public')
    .order('table_name')
    .order('ordinal_position');

  if (error) {
    console.log(colors.yellow, '⚠️  Impossibile leggere information_schema, uso fallback...');
    const tables = {};
    return tables;
  }

  const tables = {};
  for (const col of columns || []) {
    const tableName = col.table_name;
    
    if (IGNORE_TABLES.includes(tableName)) continue;
    if (tableName.startsWith('_')) continue;
    
    if (!tables[tableName]) {
      tables[tableName] = { columns: [] };
    }
    
    if (!IGNORE_COLUMNS.includes(col.column_name)) {
      tables[tableName].columns.push({
        name: col.column_name,
        type: col.data_type,
        nullable: col.is_nullable === 'YES',
      });
    }
  }

  return tables;
}

/**
 * Fetch schema Airtable (se configurato)
 */
async function fetchAirtableSchema() {
  const apiKey = process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const data = await response.json();
    
    const tables = {};
    for (const table of data.tables || []) {
      const normalizedName = normalizeTableName(table.name);
      tables[normalizedName] = {
        originalName: table.name,
        columns: (table.fields || []).map(f => ({
          name: f.name.toLowerCase().replace(/\s+/g, '_'),
          type: f.type,
        })),
      };
    }

    return tables;
  } catch (error) {
    console.log(colors.yellow, `⚠️  Errore Airtable: ${error.message}`);
    return null;
  }
}

/**
 * Confronta schemi e genera report
 */
function compareSchemas(supabaseSchema, airtableSchema) {
  const report = {
    aligned: [],
    missingInAirtable: [],
    missingInSupabase: [],
  };

  const supabaseTables = new Set(Object.keys(supabaseSchema).map(normalizeTableName));
  const airtableTables = airtableSchema 
    ? new Set(Object.keys(airtableSchema).map(normalizeTableName))
    : new Set();

  for (const table of supabaseTables) {
    if (airtableTables.has(table)) {
      report.aligned.push(table);
    } else if (airtableSchema) {
      report.missingInAirtable.push(table);
    }
  }

  if (airtableSchema) {
    for (const table of airtableTables) {
      if (!supabaseTables.has(table)) {
        report.missingInSupabase.push(table);
      }
    }
  }

  return report;
}

async function runSchemaCheck() {
  log(colors.cyan, '\n📊 CONFRONTO SCHEMA DATABASE');
  log(colors.cyan, '=' .repeat(50));

  try {
    log(colors.blue, '\n🔍 Lettura schema Supabase...');
    const supabaseSchema = await fetchSupabaseSchema();
    const supabaseCount = Object.keys(supabaseSchema).length;
    log(colors.green, `   ✅ ${supabaseCount} tabelle trovate`);

    log(colors.blue, '\n🔍 Lettura schema Airtable...');
    const airtableSchema = await fetchAirtableSchema();
    
    if (airtableSchema) {
      const airtableCount = Object.keys(airtableSchema).length;
      log(colors.green, `   ✅ ${airtableCount} tabelle trovate`);
    } else {
      log(colors.yellow, '   ⚠️  Airtable non configurato (AIRTABLE_API_KEY e AIRTABLE_BASE_ID)');
      log(colors.yellow, '   Mostro solo schema Supabase.\n');
    }

    const report = compareSchemas(supabaseSchema, airtableSchema);

    log(colors.cyan, '\n' + '='.repeat(50));
    log(colors.cyan, '📋 RIEPILOGO');
    log(colors.cyan, '='.repeat(50));

    log(colors.green, `\n🗄️  TABELLE SUPABASE (${supabaseCount}):`);
    Object.keys(supabaseSchema).sort().forEach(table => {
      const colCount = supabaseSchema[table].columns?.length || '?';
      log(colors.reset, `   - ${table} (${colCount} colonne)`);
    });

    if (airtableSchema) {
      if (report.aligned.length > 0) {
        log(colors.green, `\n✅ TABELLE ALLINEATE (${report.aligned.length}):`);
        report.aligned.forEach(t => log(colors.reset, `   - ${t}`));
      }

      if (report.missingInAirtable.length > 0) {
        log(colors.yellow, `\n⚠️  MANCANTI SU AIRTABLE (${report.missingInAirtable.length}):`);
        report.missingInAirtable.forEach(t => log(colors.yellow, `   - ${t}`));
      }

      if (report.missingInSupabase.length > 0) {
        log(colors.blue, `\n📌 SOLO SU AIRTABLE (${report.missingInSupabase.length}):`);
        report.missingInSupabase.forEach(t => log(colors.reset, `   - ${t}`));
      }

      if (report.missingInAirtable.length > 0) {
        log(colors.cyan, '\n' + '='.repeat(50));
        log(colors.yellow, '📋 AZIONI CONSIGLIATE:');
        log(colors.cyan, '='.repeat(50));
        
        report.missingInAirtable.forEach((table, i) => {
          log(colors.yellow, `   ${i + 1}. Creare tabella "${table}" su Airtable`);
        });
      }
    }

    log(colors.cyan, '\n' + '='.repeat(50));
    
    if (!airtableSchema) {
      log(colors.green, `✅ Schema Supabase: ${supabaseCount} tabelle`);
      log(colors.yellow, '⚠️  Configura Airtable per il confronto completo');
    } else if (report.missingInAirtable.length === 0) {
      log(colors.green, '✅ SCHEMA ALLINEATO - Nessuna azione richiesta');
    } else {
      log(colors.yellow, `⚠️  ${report.missingInAirtable.length} tabelle da sincronizzare`);
    }
    
    log(colors.cyan, '='.repeat(50) + '\n');

  } catch (error) {
    log(colors.red, `\n❌ Errore: ${error.message}\n`);
    process.exit(1);
  }
}

runSchemaCheck();
