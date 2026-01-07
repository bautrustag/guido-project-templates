---
description: Security audit - deep security analysis focused on common vulnerabilities
allowed-tools: Read, Grep, Glob, Bash
---

# Security Audit

Analisi approfondita della sicurezza del codebase.

## Cosa cercare

### 1. Secrets e credenziali

```bash
# Pattern pericolosi
grep -rn "password\s*=" --include="*.ts" --include="*.tsx" --include="*.js" .
grep -rn "api_key\s*=" --include="*.ts" --include="*.tsx" --include="*.js" .
grep -rn "secret\s*=" --include="*.ts" --include="*.tsx" --include="*.js" .
grep -rn "sk-" --include="*.ts" --include="*.tsx" --include="*.js" .  # OpenAI keys
grep -rn "pk_live" --include="*.ts" --include="*.tsx" --include="*.js" .  # Stripe
```

**Check .gitignore:**
- [ ] `.env` ignorato?
- [ ] `.env.local` ignorato?
- [ ] Nessun file con secrets in git history?

### 2. Input Validation

#### SQL Injection
```typescript
// ❌ VULNERABILE
db.query(`SELECT * FROM users WHERE id = ${userId}`)

// ✅ SICURO
db.query('SELECT * FROM users WHERE id = $1', [userId])
```

**Cerca:**
```bash
grep -rn "query\(\`" --include="*.ts" .
grep -rn "\${.*}" --include="*.ts" . | grep -i "query\|sql\|select\|insert\|update\|delete"
```

#### XSS (Cross-Site Scripting)
```typescript
// ❌ VULNERABILE
element.innerHTML = userInput
dangerouslySetInnerHTML={{ __html: userInput }}

// ✅ SICURO
element.textContent = userInput
// Oppure sanitizza con DOMPurify
```

**Cerca:**
```bash
grep -rn "innerHTML" --include="*.tsx" --include="*.ts" .
grep -rn "dangerouslySetInnerHTML" --include="*.tsx" .
```

### 3. Autenticazione & Autorizzazione

#### Supabase RLS
- [ ] Tutte le tabelle sensibili hanno RLS abilitato?
- [ ] Le policy sono restrittive (deny by default)?
- [ ] `service_role` key usata solo server-side?

**Check:**
```sql
-- In Supabase SQL Editor
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```

#### Auth checks
```typescript
// ❌ VULNERABILE - no auth check
export async function getSecretData() {
  return await supabase.from('secrets').select('*');
}

// ✅ SICURO
export async function getSecretData() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');
  // ...
}
```

### 4. CORS & Headers

**Check vite.config.ts / next.config.js:**
- [ ] CORS non è `*` in produzione
- [ ] Headers di sicurezza presenti

### 5. Dipendenze

```bash
# Check vulnerabilità note
npm audit

# Dipendenze outdated
npm outdated
```

### 6. Edge Functions (Supabase)

- [ ] Validazione input all'inizio
- [ ] CORS configurato correttamente
- [ ] Nessun secret hardcoded
- [ ] Error handling che non espone dettagli interni

### 7. File Upload (se presente)

- [ ] Validazione tipo file (non solo estensione)
- [ ] Limite dimensione
- [ ] Storage bucket con policy appropriate
- [ ] Nomi file sanitizzati

## Output Report

```markdown
# Security Audit Report
**Data:** YYYY-MM-DD
**Progetto:** [nome]

## Riepilogo

| Categoria | Status |
|-----------|--------|
| Secrets | ✅/⚠️/❌ |
| SQL Injection | ✅/⚠️/❌ |
| XSS | ✅/⚠️/❌ |
| Auth/RLS | ✅/⚠️/❌ |
| Dependencies | ✅/⚠️/❌ |

## Issues trovati

### 🔴 Critici (fix immediato)
[lista issues]

### 🟡 Importanti (fix presto)
[lista issues]

### 🟢 Suggerimenti
[lista miglioramenti]

## Azioni raccomandate
1. [azione prioritaria]
2. [seconda azione]
...
```

## Checklist rapida

```
□ Secrets in .env, non in codice
□ .env in .gitignore
□ Input sanitizzato prima di query DB
□ No innerHTML con user input
□ RLS abilitato su tabelle sensibili
□ Auth check su endpoint protetti
□ npm audit senza critical
□ CORS restrittivo in prod
```

## Note

- La sicurezza è un processo, non un checkpoint
- Se trovi qualcosa di critico, avvisa subito
- Documenta le decisioni di sicurezza in CLAUDE.md
