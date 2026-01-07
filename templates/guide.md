---
description: Quick reference guide for Claude Code project workflow
allowed-tools: Read
---

# Guida Rapida Workflow

## Struttura Progetto Standard

```
/
├── CLAUDE.md                # Memoria progetto (LEGGI SEMPRE)
├── ROADMAP.md               # Piano sviluppo e fasi
├── README.md                # Readme pubblico
├── docs/                    # Documentazione
│   ├── REMINDERS.md         # Gotchas e lezioni apprese
│   └── YYYY-MM-DD-*.md      # Documenti di sessione/audit
├── prompts/                 # Cronologia prompt salvati
├── scripts/                 # Script utility (opzionale)
├── src/                     # Codice sorgente
│   ├── components/          # Componenti UI
│   ├── lib/                 # Utilities, helpers
│   ├── pages/               # Pagine/routes
│   ├── types/               # TypeScript types
│   └── ...
└── tests/                   # Test (se non in src/)
```

**Regole:**
- File "memoria" sempre in root: `CLAUDE.md`, `ROADMAP.md`
- Documentazione sempre in `docs/`
- Gotchas sempre in `docs/REMINDERS.md`
- Codice sempre in `src/`

---

## Comandi Disponibili

### Ciclo di vita progetto

| Comando | Quando | Cosa fa |
|---------|--------|---------|
| `/start` | Nuovo progetto | Crea struttura, scarica template, audit iniziale |
| `/status` | Inizio sessione | Mostra TODO, fase corrente, ultime sessioni |
| `/docs` | Durante lavoro | Aggiorna documentazione (leggero) |
| `/close` | Fine sessione | Documentazione completa, salva prompts |

### Qualità e sicurezza

| Comando | Quando | Cosa fa |
|---------|--------|---------|
| `/audit` | Periodicamente | Analisi profonda: sicurezza, qualità, performance |
| `/review` | Prima di commit | Code review: bug, security, improvements |

### Git

| Comando | Quando | Cosa fa |
|---------|--------|---------|
| `/commit` | Dopo modifiche | Analizza diff, genera messaggio, committa |

### Riferimento

| Comando | Quando | Cosa fa |
|---------|--------|---------|
| `/guide` | Sempre | Questa guida |

---

## Agenti Specializzati (@)

Gli agenti hanno prefisso `@` per distinguerli dai comandi `/`.
Sono esperti di dominio per task specifici.

| Agente | Quando usarlo |
|--------|---------------|
| `@debug` | Hai un errore e non sai da dove partire |
| `@security` | Devi fare audit sicurezza prima del deploy |
| `@n8n` | Devi progettare o debuggare workflow n8n |
| `@supabase` | Schema DB, RLS, Edge Functions, real-time |
| `@gemini` | Ottimizzare prompt o integrare API Gemini |

### Esempi d'uso

#### @debug
```
/@debug
Ho questo errore in console:
TypeError: Cannot read property 'name' of undefined
at Dashboard.tsx:45

Succede quando carico la pagina dopo il login.
```
→ L'agente analizza lo stack, propone ipotesi ordinate, guida la risoluzione

#### @security
```
/@security
Fai un check completo, devo andare in produzione la settimana prossima.
Focus su: secrets, RLS Supabase, input validation.
```
→ Genera report con severità: 🔴 Critico / 🟡 Importante / 🟢 Suggerimento

#### @n8n
```
/@n8n
Devo creare un workflow che:
1. Riceve webhook con testo
2. Chiama Gemini per analizzarlo
3. Salva risultato su Supabase
4. Risponde con JSON

Come lo struttura?
```
→ Propone architettura, fornisce codice Code node, pattern error handling

#### @supabase
```
/@supabase
Devo creare sistema task con:
- Tabella tasks collegata a projects
- RLS: utenti vedono solo task dei loro progetti
- Real-time per aggiornamenti live

Genera schema e policy.
```
→ SQL completo con FK, indici, RLS policy, hook React real-time

#### @gemini
```
/@gemini
Questo prompt mi dà output JSON inconsistente:
"Analizza questo testo e dimmi categoria e sentiment"

A volte risponde con markdown, a volte JSON rotto.
Come lo fisso?
```
→ Riscrive prompt con vincoli chiari, fornisce parse robusto

---

## Workflow Tipico

### Inizio Sessione
```
1. Claude legge CLAUDE.md automaticamente
2. /status → vedi TODO e stato
3. Decidi da dove partire
```

### Durante il Lavoro
```
1. Lavori sul codice
2. /docs ogni 2-3 implementazioni
3. Aggiorna REMINDERS.md se trovi gotchas
```

### Prima di Committare
```
1. /review → controlla qualità
2. Fixa eventuali problemi
3. /commit → commit automatico
```

### Fine Sessione
```
1. /close → documentazione completa
2. Viene creato doc di sessione
3. CLAUDE.md aggiornato
```

### Periodicamente
```
/audit → check approfondito sicurezza e qualità
```

---

## File Critici

### CLAUDE.md
**Sezioni importanti:**
- REGOLE CRITICHE → Leggere sempre
- STORICO SESSIONI → Cosa è stato fatto
- PROSSIMI PASSI → TODO per prossima sessione

**Aggiornare:** Dopo ogni sessione

### ROADMAP.md
**Contiene:**
- Fasi di sviluppo
- Decisioni architetturali
- Idee parchegiate

**Aggiornare:** Quando cambiano i piani

### docs/REMINDERS.md
**Formato entry:**
```markdown
### [Categoria] - [Problema]
- **Problema:** [Descrizione]
- **Tentativi falliti:** [Cosa non ha funzionato]
- **Soluzione finale:** [Cosa ha funzionato]
- **Data:** YYYY-MM-DD
```

**Aggiornare:** Ogni volta che risolvi un problema non ovvio

---

## Best Practices

### DO ✅
- Leggi CLAUDE.md all'inizio di ogni sessione
- Usa `/status` per orientarti
- Documenta gotchas in REMINDERS.md appena li trovi
- Usa `/review` prima di commit importanti
- Usa `/docs` frequentemente (ogni 2-3 implementazioni)
- Fai `/audit` periodicamente

### DON'T ❌
- Non saltare la documentazione
- Non committare senza review su codice critico
- Non dimenticare di aggiornare i TODO
- Non lasciare console.log di debug
- Non ignorare i warning di sicurezza

---

## Troubleshooting

### "CLAUDE.md non trovato"
```
/start
```

### "Non so da dove partire"
```
/status
```

### "Ho fatto modifiche, devo committare"
```
/review    # prima controlla
/commit    # poi committa
```

### "Voglio controllare lo stato del progetto"
```
/audit
```

### "Non ricordo come si faceva X"
Cerca in `docs/REMINDERS.md`

---

## Template Documenti

### Documento di sessione
```markdown
# [Titolo] - [Data]

## Obiettivo
[Cosa si voleva ottenere]

## Implementazione
[Cosa è stato fatto]

## File Modificati
| File | Tipo | Descrizione |
|------|------|-------------|

## Note
[Eventuali note]
```

### Entry REMINDERS.md
```markdown
### [Categoria] - [Problema]
- **Problema:** [...]
- **Tentativi falliti:** [...]
- **Soluzione finale:** [...]
- **Data:** YYYY-MM-DD
```

### Commit message
```
<tipo>: <descrizione breve>

<corpo opzionale>

🤖 Generated with Claude Code
```

Tipi: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`
