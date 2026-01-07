# Guido Project Templates

Template standardizzati per progetti gestiti con Claude Code.

## Contenuto

```
templates/
├── CLAUDE.md      # Memoria di progetto principale
├── ROADMAP.md     # Piano di sviluppo e fasi
└── REMINDERS.md   # Gotchas e lezioni apprese

agents/
├── @debug.md      # Debug helper sistematico
├── @security.md   # Security audit approfondito
├── @n8n.md        # n8n workflow expert
├── @supabase.md   # Supabase database expert
└── @gemini.md     # Gemini prompt optimizer
```

## Utilizzo

I template vengono scaricati automaticamente dal comando `/start` di Claude Code.

### Download manuale

```bash
# CLAUDE.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/templates/CLAUDE.md -o CLAUDE.md

# ROADMAP.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/templates/ROADMAP.md -o ROADMAP.md

# REMINDERS.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/templates/REMINDERS.md -o docs/REMINDERS.md
```

## Struttura Progetto Consigliata

```
/
├── CLAUDE.md                # Memoria progetto
├── ROADMAP.md               # Piano sviluppo e fasi
├── README.md                # Readme pubblico
├── docs/                    # Documentazione
│   ├── REMINDERS.md         # Gotchas e lezioni apprese
│   └── YYYY-MM-DD-*.md      # Documenti di sessione
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

## Comandi Claude Code Correlati

| Comando | Descrizione |
|---------|-------------|
| `/start` | Inizializza nuovo progetto con struttura e template |
| `/status` | Riepilogo rapido: TODO, fase corrente, ultime sessioni |
| `/docs` | Aggiornamento documentazione leggero (mid-session) |
| `/close` | Chiusura sessione completa |
| `/audit` | Analisi profonda: sicurezza, qualità, performance |
| `/review` | Code review prima di commit |
| `/commit` | Commit assistito con messaggio automatico |
| `/guide` | Guida rapida di riferimento |

## Agenti Specializzati

Gli agenti hanno prefisso `@` per distinguerli dai comandi:

| Agente | Descrizione |
|--------|-------------|
| `@debug` | Investigazione sistematica errori e bug |
| `@security` | Audit sicurezza approfondito (OWASP, secrets, RLS) |
| `@n8n` | Workflow design, Code nodes, integrazione AI |
| `@supabase` | Database PostgreSQL, RLS, Edge Functions, real-time |
| `@gemini` | Ottimizzazione prompt, integrazione API Gemini |

### Installazione agenti

```bash
# Copia tutti gli agenti in ~/.claude/commands/
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/agents/@debug.md -o ~/.claude/commands/@debug.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/agents/@security.md -o ~/.claude/commands/@security.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/agents/@n8n.md -o ~/.claude/commands/@n8n.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/agents/@supabase.md -o ~/.claude/commands/@supabase.md
curl -sL https://raw.githubusercontent.com/bautrustag/guido-project-templates/main/agents/@gemini.md -o ~/.claude/commands/@gemini.md
```

## Autore

Guido Alberti - Gruppo Alberti
