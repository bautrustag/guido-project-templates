---
description: Audit completo salute progetto
allowed-tools: Read, Grep, Glob, Bash
---

# Audit Progetto

Esegui tutti questi controlli e genera un report.

## 1. Contesto Claude

```bash
wc -l CLAUDE.md 2>/dev/null || echo "CLAUDE.md non trovato"
```

| Risultato | Status |
|-----------|--------|
| < 80 righe | ✅ OK |
| 80-150 righe | ⚠️ Riduci presto |
| > 150 righe | ❌ Riduci ORA |

## 2. Build

```bash
npm run build 2>&1 | tail -10
```

| Risultato | Status |
|-----------|--------|
| Passa | ✅ OK |
| Warning | ⚠️ Verifica |
| Errore | ❌ Fix richiesto |

## 3. Lint

```bash
npm run lint 2>&1 | grep -c "error" || echo "0"
```

Conta errori e confronta con baseline in CLAUDE.md.

## 4. TypeScript

```bash
npx tsc --noEmit 2>&1 | tail -10
```

## 5. Test

```bash
npm test 2>&1 | tail -10 || echo "Test non configurati"
```

## 6. File Grandi

```bash
find src -name "*.ts" -o -name "*.tsx" 2>/dev/null | xargs wc -l 2>/dev/null | sort -rn | head -10
```

File > 500 righe = ⚠️ Candidati per refactoring

## 7. Dipendenze

```bash
npm audit --audit-level=high 2>/dev/null | tail -10 || echo "Esegui npm audit"
```

---

## Output

Genera questo report:

```markdown
# 🏥 Audit Report - [DATA]

## Riepilogo
| Check | Risultato | Status |
|-------|-----------|--------|
| CLAUDE.md | N righe | ✅/⚠️/❌ |
| Build | Passa/Fallisce | ✅/❌ |
| Lint | N errori | ✅/⚠️/❌ |
| TypeScript | Passa/N errori | ✅/❌ |
| Test | N pass / N fail | ✅/⚠️/❌ |
| File grandi | N file >500 righe | ⚠️ |
| Vulnerabilità | N high/critical | ✅/⚠️/❌ |

## Azioni Richieste
1. [Azione priorità alta]
2. [Azione priorità media]

## Note
[Osservazioni]
```
