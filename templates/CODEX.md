# [NOME PROGETTO] — Istruzioni Codex

> Questo file viene letto automaticamente da Codex CLI.
> Limite consigliato: < 120 righe. Dettagli → docs/

## Stack
[Linguaggio] + [Framework] + [Database] + [Hosting]

## Comandi
```bash
npm run dev      # sviluppo
npm run build    # DEVE passare sempre
npm run lint     # baseline: N errori
```

## 📂 STATO CONDIVISO (leggi SEMPRE a inizio sessione)

Prima di qualsiasi lavoro, leggi questi file:
1. `docs/SESSION-STATE.md` → Stato attuale, dove eravamo, prossimi passi
2. `docs/STORICO-SESSIONI.md` → Cronologia lavori (chi ha fatto cosa, con quale tool)
3. `docs/REMINDERS.md` → Errori noti e soluzioni già trovate

**A fine sessione**, aggiorna SEMPRE:
- `docs/SESSION-STATE.md` con lo stato aggiornato
- `docs/STORICO-SESSIONI.md` con una riga: `| DATA | Cosa fatto | File | Codex | Note |`

## ⛔ FILE CRITICI
| File | Righe | Regola |
|------|-------|--------|
| [file1.ts] | N | Mai riscrivere intero, solo funzioni specifiche |
| [file2.ts] | N | Sync con file1 |
| [types/index.ts] | N | Impatta tutto il progetto |

## 🛡️ REGOLE

### Modifiche
- File > 400 righe → modifica SOLO la funzione specifica, MAI riscrivere intero
- File > 1000 righe → proponi piano e chiedi conferma PRIMA di toccare
- `npm run build` deve passare dopo OGNI modifica
- Dopo 2 tentativi falliti → STOP, spiega cosa hai provato e chiedi

### Cosa NON fare
- MAI usare `any` in TypeScript (usa tipi espliciti)
- MAI rimuovere commenti/TODO senza motivo
- MAI dire "fatto" senza aver verificato con build
- MAI inventare dati o test — usa quelli reali o chiedi
- MAI modificare componenti in `src/components/ui/` (sono shadcn, creare wrapper)

### Cosa fare SEMPRE
- Consulta `docs/REMINDERS.md` PRIMA di modificare aree già documentate
- Mostra cosa hai modificato (diff o lista file)
- Se non capisci la richiesta → chiedi PRIMA di scrivere codice

## 🗂️ STRUTTURA PROGETTO
```
src/
├── components/
│   ├── ui/          # shadcn (NON toccare)
│   ├── layout/      # Sidebar, Header
│   └── shared/      # Componenti riusabili
├── context/         # AuthContext, etc.
├── hooks/           # Custom hooks
├── lib/
│   ├── db/          # CRUD Supabase
│   └── utils.ts     # Utilities
├── pages/           # Route pages
└── types/
    └── index.ts     # Tipi centrali
```

## 📁 DOCUMENTAZIONE
- `ROADMAP.md` → Piano sviluppo e fasi
- `docs/SESSION-STATE.md` → Stato condiviso tra tool
- `docs/REMINDERS.md` → Errori noti e soluzioni
- `docs/STORICO-SESSIONI.md` → Cronologia lavori
- `docs/ARCHITETTURA.md` → Dettagli tecnici approfonditi

## 🎯 PROSSIMI PASSI
- [ ] [Task priorità alta 1]
- [ ] [Task priorità alta 2]
- [ ] [Task priorità media 1]

## 🔄 COMANDI SESSIONE

Quando l'utente digita questi comandi, esegui l'azione corrispondente:

**`/clear-safe`** — Salva stato prima di reset:
1. Aggiorna `docs/SESSION-STATE.md` con stato attuale
2. Aggiungi riga a `docs/STORICO-SESSIONI.md`
3. Se bug risolto → aggiungi a `docs/REMINDERS.md`
4. Conferma: "✅ Stato salvato. Puoi resettare."

**`/status`** — Mostra stato progetto:
1. Leggi e mostra `docs/SESSION-STATE.md`
2. Esegui `npm run build` e mostra risultato

**`/storico`** — Mostra cronologia:
1. Mostra ultime 10 righe di `docs/STORICO-SESSIONI.md`

## 🎯 PRIMA DI INIZIARE OGNI TASK
Scrivi 3 "Criteri di Verifica":
- [ ] [Risultato visibile 1]
- [ ] [Risultato visibile 2]
- [ ] [npm run build passa]

---
_Ultimo update: [DATA] | Righe: ~100/120 | Tool: Codex_
