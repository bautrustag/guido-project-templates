# Status - Project Status Summary

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

total=$(wc -l docs/*.md 2>/dev/null | tail -1 | awk '{print $1}')
echo "docs/*.md totale: $total righe"
```

### STEP 2: Leggi Stato Condiviso

**Leggi `docs/SESSION-STATE.md`** — questo è il file più importante:
- Ultimo aggiornamento (chi, quando, con quale tool)
- Stato build
- Lavori in corso
- Prossimi passi
- Note dal tool precedente

### STEP 3: Leggi TODO

Da CLAUDE.md estrai:
- Prossimi passi
- Eventuali blocchi

Da ROADMAP.md estrai:
- Fase attuale e percentuale completamento

### STEP 4: Ultime Sessioni

```bash
echo "=== ULTIME SESSIONI ==="
tail -10 docs/STORICO-SESSIONI.md 2>/dev/null
```

### STEP 5: Verifica Build

```bash
npm run build 2>&1 | tail -5
```

### STEP 6: Output

```
## 📊 STATUS PROGETTO

### Stato Condiviso (docs/SESSION-STATE.md)
- Ultimo update: [DATA] da [TOOL]
- Build: ✅/❌
- Lavori in corso: [lista o "nessuno"]

### Context Health
| Metrica | Valore | Stato |
|---------|--------|-------|
| CLAUDE.md | XX righe | ✅/⚠️ |
| docs/ totale | XX righe | ✅/⚠️ |

### Prossimi Passi
[Da SESSION-STATE.md + CLAUDE.md]

### Ultime Sessioni
[Ultime 5 righe da STORICO-SESSIONI.md, mostrando colonna Tool]

### Build Status
✅ OK / ❌ Errori
```
