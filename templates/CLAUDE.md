# CLAUDE.md - [NOME PROGETTO]

## INFORMAZIONI PROGETTO

| Campo | Valore |
|-------|--------|
| **Nome** | [Nome progetto] |
| **Descrizione** | [Descrizione breve] |
| **Stack** | [Tecnologie principali] |
| **Database** | [Database utilizzato] |
| **Hosting** | [Dove è hostato] |
| **Repository** | [URL repository] |
| **Versione** | 0.1.0 |

---

## REGOLE CRITICHE

### ALL'INIZIO DI OGNI SESSIONE

**PRIMA DI QUALSIASI ALTRA COSA**, leggi questo file CLAUDE.md e in particolare:
1. La sezione "PROSSIMI PASSI" in fondo al documento
2. Lo storico sessioni per capire cosa è stato fatto di recente
3. Comunica all'utente i TODO pendenti e chiedi da dove vuole partire

### ERRORI RICORRENTI

Prima di modificare codice critico:
1. **LEGGI** il file `docs/REMINDERS.md`
2. Contiene errori già risolti in passato e come evitarli
3. **AGGIORNA** il file quando si scopre un nuovo errore ricorrente

### DOCUMENTAZIONE

Ogni implementazione significativa DEVE essere documentata:
1. Crea un documento in `/docs` con formato `YYYY-MM-DD-HH-MM-descrizione.md`
2. Aggiorna CLAUDE.md (storico sessioni)
3. Aggiorna ROADMAP.md se necessario
4. Aggiungi gotchas a `docs/REMINDERS.md`

---

## STRUTTURA PROGETTO

```
/
├── CLAUDE.md                # Memoria progetto (questo file)
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

---

## CONTESTO BUSINESS

[Descrivi qui il contesto aziendale, le entità coinvolte, i processi principali]

---

## REGOLE DI SVILUPPO

### Codice
- Limita le modifiche al minimo necessario
- Se devi modificare più di 3 file, chiedi conferma
- Mantieni la struttura e lo stile esistente

### Naming
- File componenti: PascalCase (es: NavBar.tsx)
- File utility: camelCase (es: formatters.ts)
- Variabili e funzioni: camelCase
- Costanti: SCREAMING_SNAKE_CASE

### Logging
Sempre aggiungere console.log in funzioni critiche:
```typescript
export async function nomeFunzione(parametro: string): Promise<Tipo | null> {
  console.log('[nomeFunzione] Starting with:', parametro);
  try {
    // ... codice ...
    console.log('[nomeFunzione] Success');
    return risultato;
  } catch (error) {
    console.error('[nomeFunzione] Errore:', error);
    return null;
  }
}
```

---

## STATO PROGETTO

### Fase Corrente: [Nome Fase]

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

### Fasi Completate

[Elenco fasi completate]

---

## PROBLEMI NOTI

1. **[Problema]**: [Descrizione] - [Stato: Da risolvere/In corso/Risolto]

---

## STORICO SESSIONI

| Data | Cosa fatto | Note |
|------|------------|------|
| YYYY-MM-DD | [Descrizione breve] | [Note aggiuntive] |

---

## PROSSIMI PASSI (TODO per prossima sessione)

### Priorità Alta
- [ ] [Task urgente 1]
- [ ] [Task urgente 2]

### Priorità Media
- [ ] [Task importante 1]
- [ ] [Task importante 2]

### Backlog
- [ ] [Task futuro 1]
- [ ] [Task futuro 2]

---

**Ultimo aggiornamento:** [Data]
**Versione:** 0.1.0
