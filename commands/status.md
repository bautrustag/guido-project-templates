# Status - Riepilogo Stato Progetto

## Istruzioni per Claude

Quando l'utente invoca `/status`, esegui:

### STEP 1: Quick Context Check

```bash
echo "=== CONTEXT QUICK CHECK ==="
claude_lines=$(wc -l < CLAUDE.md 2>/dev/null || echo "0")
echo "CLAUDE.md: $claude_lines righe"

if [ "$claude_lines" -gt 150 ]; then
  echo "⚠️ CLAUDE.md troppo grande - considera /optimize"
fi

# Check totale docs
total=$(wc -l docs/*.md 2>/dev/null | tail -1 | awk '{print $1}')
echo "docs/*.md totale: $total righe"

if [ "$total" -gt 1500 ]; then
  echo "⚠️ docs/ troppo grande - considera /optimize"
fi
```

### STEP 2: Leggi Stato Progetto

Da CLAUDE.md estrai:
- Fase corrente
- Prossimi passi
- Eventuali blocchi

Da ROADMAP.md estrai:
- Fase attuale e percentuale completamento
- Prossimi milestone

### STEP 3: Ultime Sessioni

```bash
ls -lt docs/*.md 2>/dev/null | head -5
```

Mostra ultime sessioni/modifiche.

### STEP 4: Verifica Build

```bash
npm run build 2>&1 | tail -5
```

### STEP 5: Output

```
## 📊 STATUS PROGETTO

### Context Health
| Metrica | Valore | Stato |
|---------|--------|-------|
| CLAUDE.md | XX righe | ✅/⚠️ |
| docs/ totale | XX righe | ✅/⚠️ |

[Se warning: "💡 Esegui /context-check per dettagli, /optimize per archiviare"]

### Fase Corrente
[Da ROADMAP.md]

### Prossimi Passi
[Da CLAUDE.md]

### Ultime Sessioni
[Lista ultime 3-5 sessioni]

### Build Status
✅ OK / ❌ Errori
```
