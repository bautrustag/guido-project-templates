#!/usr/bin/env node

/**
 * AUDIT SCRIPT - Health Check Automatico
 * 
 * Naviga tutte le pagine dell'app e verifica:
 * - Errori JavaScript in console
 * - Chiamate API fallite (400/500)
 * - Caricamento pagine
 * - Health check tabelle Supabase
 * 
 * Uso:
 *   npm run audit                    # Audit completo
 *   npm run audit -- --skip-login    # Salta login
 *   npm run audit -- --headless=false # Mostra browser
 *   npm run audit -- --url=https://... # URL custom
 */

import puppeteer from 'puppeteer';

// ============================================================================
// CONFIGURAZIONE - PERSONALIZZA PER IL TUO PROGETTO
// ============================================================================

/**
 * Lista delle pagine da testare
 * Modifica questa lista in base alle route del tuo progetto
 */
const PAGES = [
  '/',
  '/dashboard',
  // Aggiungi qui tutte le route del tuo progetto
  // '/clienti',
  // '/contratti',
  // '/settings',
];

/**
 * Configurazione login (se necessario)
 * Imposta SKIP_LOGIN=true se l'app non richiede autenticazione
 */
const AUTH_CONFIG = {
  loginUrl: '/login',
  usernameSelector: 'input[type="email"], input[name="email"], #email',
  passwordSelector: 'input[type="password"], input[name="password"], #password',
  submitSelector: 'button[type="submit"]',
  // Credenziali da variabili ambiente o valori di default per test
  username: process.env.TEST_USER || 'test@example.com',
  password: process.env.TEST_PASSWORD || 'testpassword',
};

/**
 * Tabelle database da verificare (per progetti con Supabase)
 * Lascia vuoto se non usi Supabase o non vuoi verificare le tabelle
 */
const SUPABASE_TABLES = [
  // 'users',
  // 'posts',
  // 'comments',
];

// ============================================================================
// SCRIPT - NON MODIFICARE SOTTO QUESTA RIGA
// ============================================================================

const args = process.argv.slice(2);
const SKIP_LOGIN = args.includes('--skip-login');
const HEADLESS = !args.includes('--headless=false');
const CUSTOM_URL = args.find(a => a.startsWith('--url='))?.split('=')[1];
const BASE_URL = CUSTOM_URL || process.env.APP_URL || 'http://localhost:5173';

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

async function runAudit() {
  const startTime = Date.now();
  const results = {
    pages: { total: 0, ok: 0, errors: [] },
    consoleErrors: [],
    networkErrors: [],
    apiHealth: { total: 0, ok: 0, errors: [] },
  };

  log(colors.cyan, '\n📊 AUDIT APPLICAZIONE');
  log(colors.cyan, '=' .repeat(50));
  log(colors.blue, `📍 URL: ${BASE_URL}`);
  log(colors.blue, `🔐 Login: ${SKIP_LOGIN ? 'Saltato' : 'Abilitato'}`);
  log(colors.blue, `👁️  Headless: ${HEADLESS ? 'Sì' : 'No'}\n`);

  const browser = await puppeteer.launch({
    headless: HEADLESS ? 'new' : false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  
  // Cattura errori console
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignora warning comuni non critici
      if (!text.includes('Warning:') && 
          !text.includes('DevTools') &&
          !text.includes('favicon')) {
        results.consoleErrors.push({
          page: page.url(),
          message: text.substring(0, 200),
        });
      }
    }
  });

  // Cattura errori di rete
  page.on('requestfailed', request => {
    const url = request.url();
    if (!url.includes('favicon') && !url.includes('hot-update')) {
      results.networkErrors.push({
        page: page.url(),
        url: url,
        error: request.failure()?.errorText || 'Unknown',
      });
    }
  });

  // Cattura risposte API con errori
  page.on('response', response => {
    const status = response.status();
    const url = response.url();
    if (status >= 400 && !url.includes('favicon')) {
      results.networkErrors.push({
        page: page.url(),
        url: url,
        error: `HTTP ${status}`,
      });
    }
  });

  try {
    // Login se necessario
    if (!SKIP_LOGIN && AUTH_CONFIG.username && AUTH_CONFIG.password) {
      log(colors.blue, '🔐 Eseguendo login...');
      try {
        await page.goto(`${BASE_URL}${AUTH_CONFIG.loginUrl}`, { 
          waitUntil: 'networkidle2',
          timeout: 30000 
        });
        
        await page.waitForSelector(AUTH_CONFIG.usernameSelector, { timeout: 5000 });
        await page.type(AUTH_CONFIG.usernameSelector, AUTH_CONFIG.username);
        await page.type(AUTH_CONFIG.passwordSelector, AUTH_CONFIG.password);
        await page.click(AUTH_CONFIG.submitSelector);
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });
        
        log(colors.green, '✅ Login completato\n');
      } catch (e) {
        log(colors.yellow, '⚠️  Login fallito o non necessario, continuo...\n');
      }
    }

    // Test pagine
    log(colors.cyan, '🌐 TEST PAGINE');
    log(colors.cyan, '-'.repeat(50));
    
    for (const path of PAGES) {
      results.pages.total++;
      const url = `${BASE_URL}${path}`;
      
      try {
        const response = await page.goto(url, { 
          waitUntil: 'networkidle2',
          timeout: 30000 
        });
        
        await page.waitForTimeout(1000); // Attendi eventuali render asincroni
        
        const status = response?.status() || 0;
        
        if (status >= 200 && status < 400) {
          results.pages.ok++;
          log(colors.green, `   ✅ ${path}`);
        } else {
          results.pages.errors.push({ path, error: `HTTP ${status}` });
          log(colors.red, `   ❌ ${path} (HTTP ${status})`);
        }
      } catch (e) {
        results.pages.errors.push({ path, error: e.message });
        log(colors.red, `   ❌ ${path} (${e.message.substring(0, 50)})`);
      }
    }

    // API Health Check (se configurato Supabase)
    if (SUPABASE_TABLES.length > 0 && process.env.SUPABASE_URL) {
      log(colors.cyan, '\n🔌 API HEALTH CHECK');
      log(colors.cyan, '-'.repeat(50));
      
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_KEY
      );

      for (const table of SUPABASE_TABLES) {
        results.apiHealth.total++;
        try {
          const { data, error } = await supabase.from(table).select('id').limit(1);
          if (error) throw error;
          results.apiHealth.ok++;
          log(colors.green, `   ✅ ${table}: OK`);
        } catch (e) {
          results.apiHealth.errors.push({ table, error: e.message });
          log(colors.red, `   ❌ ${table}: ${e.message.substring(0, 50)}`);
        }
      }
    }

  } finally {
    await browser.close();
  }

  // Report finale
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  log(colors.cyan, '\n' + '='.repeat(50));
  log(colors.cyan, '📋 RIEPILOGO');
  log(colors.cyan, '='.repeat(50));
  
  // Pagine
  const pagesOk = results.pages.ok === results.pages.total;
  log(pagesOk ? colors.green : colors.red, 
    `\n🌐 Pagine: ${results.pages.ok}/${results.pages.total} ${pagesOk ? '✅' : '❌'}`);
  
  if (results.pages.errors.length > 0) {
    results.pages.errors.forEach(e => {
      log(colors.red, `   - ${e.path}: ${e.error}`);
    });
  }

  // Errori Console
  const uniqueConsoleErrors = [...new Set(results.consoleErrors.map(e => e.message))];
  if (uniqueConsoleErrors.length > 0) {
    log(colors.red, `\n⚠️  Errori Console: ${uniqueConsoleErrors.length}`);
    uniqueConsoleErrors.slice(0, 5).forEach(e => {
      log(colors.red, `   - ${e.substring(0, 100)}`);
    });
    if (uniqueConsoleErrors.length > 5) {
      log(colors.yellow, `   ... e altri ${uniqueConsoleErrors.length - 5}`);
    }
  } else {
    log(colors.green, '\n⚠️  Errori Console: 0 ✅');
  }

  // Errori Network
  const uniqueNetworkErrors = [...new Set(results.networkErrors.map(e => `${e.error}: ${e.url}`))];
  if (uniqueNetworkErrors.length > 0) {
    log(colors.red, `\n🔌 Errori Network: ${uniqueNetworkErrors.length}`);
    uniqueNetworkErrors.slice(0, 5).forEach(e => {
      log(colors.red, `   - ${e.substring(0, 100)}`);
    });
  } else {
    log(colors.green, '\n🔌 Errori Network: 0 ✅');
  }

  // API Health
  if (results.apiHealth.total > 0) {
    const apiOk = results.apiHealth.ok === results.apiHealth.total;
    log(apiOk ? colors.green : colors.red,
      `\n🗄️  API: ${results.apiHealth.ok}/${results.apiHealth.total} ${apiOk ? '✅' : '❌'}`);
  }

  // Score salute
  const errorCount = uniqueConsoleErrors.length + uniqueNetworkErrors.length + results.pages.errors.length + results.apiHealth.errors.length;
  const healthScore = Math.max(0, Math.round(100 - (errorCount * 10)));
  
  let healthLevel, healthColor;
  if (healthScore >= 90) { healthLevel = 'OTTIMA'; healthColor = colors.green; }
  else if (healthScore >= 70) { healthLevel = 'BUONA'; healthColor = colors.green; }
  else if (healthScore >= 50) { healthLevel = 'MEDIA'; healthColor = colors.yellow; }
  else { healthLevel = 'CRITICA'; healthColor = colors.red; }

  log(colors.cyan, '\n' + '='.repeat(50));
  log(healthColor, `🏥 SALUTE SISTEMA: ${healthLevel} (${healthScore}%)`);
  log(colors.cyan, '='.repeat(50));
  log(colors.blue, `⏱️  Tempo: ${duration}s`);

  if (errorCount === 0) {
    log(colors.green, '\n✨ Nessuna azione richiesta - tutto funziona!\n');
  } else {
    log(colors.yellow, `\n📋 AZIONI CONSIGLIATE: ${errorCount} problemi da verificare\n`);
  }

  // Exit code basato su errori critici
  process.exit(results.pages.errors.length > 0 ? 1 : 0);
}

runAudit().catch(e => {
  console.error('Errore audit:', e);
  process.exit(1);
});
