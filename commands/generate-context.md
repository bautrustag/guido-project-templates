# Generate Context - Create or Update PROJECT-CONTEXT.md for Claude.ai Projects

## Istruzioni per Claude

Quando l'utente invoca `/generate-context`, esegui questi step:

### STEP 1: Verifica se esiste già

```bash
if [ -f "PROJECT-CONTEXT.md" ]; then
  echo "📄 PROJECT-CONTEXT.md ESISTE - Modalità AGGIORNAMENTO"
  wc -l PROJECT-CONTEXT.md
else
  echo "📄 PROJECT-CONTEXT.md NON ESISTE - Modalità CREAZIONE"
fi
```

### STEP 2: Raccogli informazioni

Leggi questi file (in ordine di priorità):

```bash
# File principali
cat CLAUDE.md
cat ROADMAP.md
cat docs/reminders.md 2>/dev/null

# Stack
cat package.json | head -50

# Storico (se esiste)
ls docs/archive/*.md 2>/dev/null | head -10
```

Se `PROJECT-CONTEXT.md` esiste già, leggilo per mantenere informazioni valide:
```bash
cat PROJECT-CONTEXT.md
```

### STEP 3: Genera/Aggiorna il file

Crea o sovrascrivi `PROJECT-CONTEXT.md` con questa struttura:

```markdown
# PROJECT CONTEXT: [Nome Progetto]

> **Generato da:** /generate-context
> **Ultimo aggiornamento:** [data]
> **Uso:** Allegare a Claude.ai Progetti come contesto persistente

---

## 1. Overview
- Cos'è il progetto (2-3 frasi)
- A chi serve (target user)
- Problema che risolve

## 2. Stack Tecnologico
| Categoria | Tecnologia | Note |
|-----------|------------|------|
| Frontend | [framework] | |
| UI | [libreria] | |
| Backend | [database/API] | |
| Hosting | [piattaforma] | |
| Altro | [tool] | |

## 3. Architettura
- Pattern principali (es: dual-database, fallback, ecc.)
- Flusso dati semplificato
- Integrazioni esterne

## 4. Stato Attuale
| Fase | Stato | Note |
|------|-------|------|
| [Nome Fase] | ✅/🔄/❌ | |

**Prossime priorità:**
1. [priorità 1]
2. [priorità 2]

## 5. Anti-Pattern Critici
> Questi errori causano bug. NON farli.

| # | Anti-Pattern | Conseguenza |
|---|--------------|-------------|
| 1 | [cosa non fare] | [cosa succede] |
| 2 | ... | ... |

## 6. Decisioni Architetturali
| Decisione | Motivo | Data |
|-----------|--------|------|
| [scelta fatta] | [perché] | [quando] |

## 7. Storico Rilevante
| Data | Evento | Impatto |
|------|--------|---------|
| [data] | [cosa è successo] | [conseguenza] |

## 8. File Critici
| File | Scopo |
|------|-------|
| [path/file.ts] | [cosa fa in 1 riga] |

## 9. Regole per Claude.ai
Quando ricevi richieste per questo progetto:
1. Genera sempre prompt strutturati per Claude Code
2. Includi sempre "Criteri di Verifica" (3 checkbox minimo)
3. Se tocca un anti-pattern, avvisa prima di procedere
4. Se la richiesta è ambigua, chiedi chiarimenti
```

### STEP 4: Verifica e Report

```bash
echo "=== PROJECT-CONTEXT.md GENERATO ==="
wc -l PROJECT-CONTEXT.md
echo ""
echo "=== SEZIONI ==="
grep "^## " PROJECT-CONTEXT.md
```

**Output:**

```
📄 PROJECT-CONTEXT.md generato/aggiornato

| Sezione | Righe |
|---------|-------|
| Overview | XX |
| Stack | XX |
| ... | ... |
| TOTALE | XX |

✅ File pronto per upload su Claude.ai Progetti
```

### STEP 5: Istruzioni per l'utente

Mostra questo messaggio:

```
## 📋 PROSSIMI PASSI

1. Apri Claude.ai → Progetti → Crea nuovo progetto
2. Nome: "[Nome Progetto]"
3. Clicca "Add content" → Upload PROJECT-CONTEXT.md
4. In "Project instructions" incolla:

---
Sei il mio assistente per tradurre richieste business in prompt strutturati per Claude Code.
Leggi PROJECT-CONTEXT.md per capire il progetto.
Per ogni richiesta genera un prompt con: problema, comportamento atteso, file coinvolti, criteri di verifica.
---

5. Salva il progetto
```

---

## Note

- Se il file esiste, viene SOVRASCRITTO con dati aggiornati
- Le informazioni vengono prese dai file correnti (non da cache)
- Il file è pensato per essere ALLEGATO a Claude.ai, non per Claude Code
- Rigenera periodicamente per mantenere il contesto aggiornato
