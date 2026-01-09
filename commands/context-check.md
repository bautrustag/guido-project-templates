# Context Check - Context Health Analysis

## Istruzioni per Claude

Quando l'utente invoca `/context-check`, esegui questa analisi completa:

### STEP 1: Verifica dimensione CLAUDE.md

```bash
wc -l CLAUDE.md
```

| Righe | Stato | Azione |
|-------|-------|--------|
| < 100 | ✅ OK | Nessuna |
| 100-200 | ⚠️ Attenzione | Valuta se spostare contenuti |
| > 200 | 🔴 CRITICO | Suggerisci `/optimize` |

### STEP 2: Verifica file in docs/

```bash
wc -l docs/*.md 2>/dev/null | sort -rn | head -20
```

**Soglie per singolo file:**

| Righe | Stato | Azione |
|-------|-------|--------|
| < 200 | ✅ OK | Nessuna |
| 200-500 | ⚠️ Attenzione | Valuta archiviazione parziale |
| > 500 | 🔴 CRITICO | Suggerisci `/optimize` |

### STEP 3: Verifica ROADMAP.md

```bash
wc -l ROADMAP.md 2>/dev/null
```

| Righe | Stato | Azione |
|-------|-------|--------|
| < 300 | ✅ OK | Nessuna |
| 300-500 | ⚠️ Attenzione | Archivia fasi completate |
| > 500 | 🔴 CRITICO | Suggerisci `/optimize` |

### STEP 4: Calcola totale Memory Files

```bash
total=0
for f in CLAUDE.md ROADMAP.md docs/*.md; do
  if [ -f "$f" ]; then
    lines=$(wc -l < "$f")
    total=$((total + lines))
  fi
done
echo "Totale righe Memory Files: $total"
```

**Soglie totale:**

| Righe Totali | Token Stimati | Stato |
|--------------|---------------|-------|
| < 500 | ~2k | ✅ Ottimo |
| 500-1000 | ~4k | ✅ OK |
| 1000-2000 | ~8k | ⚠️ Attenzione |
| > 2000 | >10k | 🔴 Esegui `/optimize` |

### STEP 5: Output Report

Genera tabella riassuntiva:

```
## 📊 CONTEXT HEALTH CHECK

| File | Righe | Stato | Azione |
|------|-------|-------|--------|
| CLAUDE.md | XX | ✅/⚠️/🔴 | ... |
| ROADMAP.md | XX | ✅/⚠️/🔴 | ... |
| docs/reminders.md | XX | ✅/⚠️/🔴 | ... |
| ... | ... | ... | ... |
| **TOTALE** | XXX | ✅/⚠️/🔴 | ... |

### Raccomandazioni
[Lista azioni consigliate se ci sono warning/critical]
```

### STEP 6: Suggerimenti Automatici

Se ci sono file 🔴 CRITICO, suggerisci:

```
⚠️ AZIONE RICHIESTA

Alcuni file superano le soglie consigliate.
Esegui `/optimize` per archiviare automaticamente i contenuti vecchi.

Il comando NON cancella nulla - sposta solo in docs/archive/
```

---

## Note

- Questo comando è solo DIAGNOSTICO
- Non modifica nessun file
- Suggerisce `/optimize` se necessario
