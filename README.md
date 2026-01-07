# Guido Project Templates

Template standardizzati per progetti gestiti con Claude Code.

## Contenuto

```
templates/
├── CLAUDE.md      # Memoria di progetto principale
├── ROADMAP.md     # Piano di sviluppo e fasi
└── REMINDERS.md   # Gotchas e lezioni apprese
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

## Autore

Guido Alberti - Gruppo Alberti
