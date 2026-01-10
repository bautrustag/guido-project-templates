---
description: Security audit - analisi vulnerabilità comuni
allowed-tools: Read, Grep, Glob, Bash
---

# Security Audit

Analisi approfondita della sicurezza del codebase.

## ⚡ ESEGUI SUBITO

```bash
# 1. Secrets hardcoded
grep -rn "password\s*=\|api_key\s*=\|secret\s*=\|sk-\|pk_live" --include="*.ts" --include="*.tsx" --include="*.js" src/ || echo "OK: Nessun secret trovato"

# 2. .env in gitignore
grep -q "\.env" .gitignore && echo "OK: .env ignorato" || echo "⚠️ .env NON in .gitignore!"

# 3. Vulnerabilità dipendenze
npm audit --audit-level=high 2>/dev/null | tail -20 || echo "Esegui npm audit manualmente"
```

---

## Checklist Sicurezza

### 1. Secrets e Credenziali
- [ ] `.env` in `.gitignore`
- [ ] Nessun secret hardcoded nel codice
- [ ] Nessun secret in git history

### 2. Input Validation

**SQL Injection:**
```bash
grep -rn 'query\(`\|query(`' --include="*.ts" src/ | head -10
```
```typescript
// ❌ VULNERABILE
db.query(`SELECT * FROM users WHERE id = ${userId}`)

// ✅ SICURO
db.query('SELECT * FROM users WHERE id = $1', [userId])
```

**XSS:**
```bash
grep -rn "innerHTML\|dangerouslySetInnerHTML" --include="*.tsx" src/
```

### 3. Supabase RLS
- [ ] RLS abilitato su tabelle sensibili
- [ ] Policy restrittive (deny by default)
- [ ] `service_role` usata solo server-side

### 4. Auth
- [ ] Token verificati lato server
- [ ] Sessioni con scadenza
- [ ] Logout pulisce tutto

### 5. CORS & Headers
- [ ] CORS non è `*` in produzione
- [ ] Headers di sicurezza presenti

---

## Output Report

```markdown
# Security Audit - [DATA]

## Riepilogo
| Area | Status |
|------|--------|
| Secrets | ✅/⚠️/❌ |
| SQL Injection | ✅/⚠️/❌ |
| XSS | ✅/⚠️/❌ |
| Auth/RLS | ✅/⚠️/❌ |
| Dipendenze | ✅/⚠️/❌ |

## 🔴 Critici (fix immediato)
- [issue]

## 🟡 Importanti (fix presto)
- [issue]

## 🟢 Suggerimenti
- [miglioramento]
```

---

## Note

- La sicurezza è un processo continuo
- Se trovi qualcosa di critico, avvisa subito
- Documenta le decisioni di sicurezza in CLAUDE.md
