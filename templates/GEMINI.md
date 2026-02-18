# [NOME PROGETTO] — Istruzioni Gemini

> Questo file viene letto automaticamente da Gemini CLI.
> Gemini ha context window ampio (1M+), ma tieni comunque questo file focalizzato.
> Limite consigliato: < 200 righe. Dettagli → docs/

## Stack
[Linguaggio] + [Framework] + [Database] + [Hosting]

## Comandi
```bash
npm run dev      # sviluppo
npm run build    # DEVE passare sempre
npm run lint     # baseline: N errori
```

## 📂 STATO CONDIVISO (leggi SEMPRE a inizio sessione)

Prima di qualsiasi lavoro, leggi questi 3 file:
1. **`docs/SESSION-STATE.md`** → Stato attuale progetto, dove eravamo, prossimi passi, stato build
2. **`docs/STORICO-SESSIONI.md`** → Cronologia completa lavori (chi ha fatto cosa, con quale tool AI)
3. **`docs/REMINDERS.md`** → Errori noti con sintomo/causa/soluzione già documentati

Questo progetto viene sviluppato con **più AI coding assistants** (Claude Code, Codex, Gemini).
I file condivisi in `docs/` sono il ponte tra le sessioni. Leggili sempre. Aggiornali sempre.

**A fine sessione**, aggiorna SEMPRE:
- `docs/SESSION-STATE.md` → Stato aggiornato (prossimi passi, stato build, lavori in corso)
- `docs/STORICO-SESSIONI.md` → Aggiungi riga: `| DATA | Cosa fatto | File | Gemini | Note |`
- `docs/REMINDERS.md` → Se hai risolto un bug non ovvio, documentalo

## ⛔ FILE CRITICI
| File | Righe | Regola |
|------|-------|--------|
| [file1.ts] | N | Mai riscrivere intero, solo funzioni specifiche |
| [file2.ts] | N | Sync con file1 |
| [types/index.ts] | N | Tipo centrali, impatta tutto il progetto |

## 🛡️ REGOLE

### Modifiche codice
- File > 400 righe → modifica SOLO la funzione specifica, MAI riscrivere intero file
- File > 1000 righe → proponi piano dettagliato e chiedi conferma PRIMA di toccare
- `npm run build` deve passare dopo OGNI modifica — verificalo sempre
- Dopo 2 tentativi falliti su stesso problema → STOP, spiega cosa hai provato e chiedi

### Cosa NON fare
- MAI usare `any` in TypeScript — usa sempre tipi espliciti
- MAI rimuovere commenti o TODO senza motivo esplicito
- MAI dire "fatto" senza aver eseguito e verificato `npm run build`
- MAI inventare dati, mock o test fittizi — usa quelli reali o chiedi
- MAI modificare componenti in `src/components/ui/` (sono shadcn/ui, creare wrapper custom)
- MAI ignorare errori preesistenti — fixali prima di procedere

### Cosa fare SEMPRE
- Consulta `docs/REMINDERS.md` PRIMA di modificare aree già documentate
- Mostra cosa hai modificato (lista file + descrizione cambiamento)
- Se la richiesta è ambigua o non chiara → chiedi PRIMA di scrivere codice
- Se tocchi più di 3 file → elenca il piano e chiedi conferma

## 🗂️ STRUTTURA PROGETTO
```
src/
├── components/
│   ├── ui/          # shadcn/ui (NON toccare, creare wrapper)
│   ├── layout/      # Sidebar, Header, Layout
│   └── shared/      # Componenti riusabili custom
├── context/         # React Context (Auth, Theme, etc.)
├── hooks/           # Custom hooks React
├── lib/
│   ├── db/          # DB layer CRUD Supabase (1 file per entità)
│   ├── supabase.ts  # Client Supabase
│   └── utils.ts     # Utilities generiche
├── pages/           # Route pages
└── types/
    └── index.ts     # Tipi TypeScript centrali
```

## 📁 DOCUMENTAZIONE COMPLETA
| File | Contenuto |
|------|-----------|
| `ROADMAP.md` | Piano sviluppo, fasi, milestone |
| `docs/SESSION-STATE.md` | **Stato condiviso** tra tutti i tool AI |
| `docs/REMINDERS.md` | Errori noti con sintomo/causa/soluzione |
| `docs/STORICO-SESSIONI.md` | Cronologia completa lavori |
| `docs/ARCHITETTURA.md` | Dettagli tecnici, schema DB, pattern |

## 🎯 PROSSIMI PASSI
- [ ] [Task priorità alta 1]
- [ ] [Task priorità alta 2]
- [ ] [Task priorità media 1]

## 🔄 COMANDI SESSIONE

Quando l'utente digita questi comandi, esegui l'azione corrispondente:

### `/clear-safe` — Salva stato prima di reset
1. Aggiorna `docs/SESSION-STATE.md` con:
   - Ultimo aggiornamento (data/ora)
   - Cosa è stato fatto in questa sessione
   - Prossimi passi concreti
   - Stato build (passa/non passa)
   - Lavori in corso (se incompleti)
2. Aggiungi riga a `docs/STORICO-SESSIONI.md`:
   `| DATA | Descrizione lavoro | file1.ts, file2.tsx | Gemini | Note eventuali |`
3. Se hai risolto un bug non ovvio → aggiungi entry a `docs/REMINDERS.md`
4. Conferma: "✅ Stato salvato nei file condivisi. Puoi resettare il contesto."

### `/status` — Mostra stato progetto
1. Leggi e mostra contenuto di `docs/SESSION-STATE.md`
2. Esegui `npm run build` e mostra risultato (passa/errori)

### `/storico` — Mostra cronologia recente
1. Mostra ultime 10 righe della tabella in `docs/STORICO-SESSIONI.md`

## 🧠 MINDSET

- **Non mettere pezze** — Se qualcosa non funziona, trova la causa vera
- **Non partire in quarta** — Prima capisci il problema, poi agisci
- **Non inventare** — Se non sai, chiedi
- **Meglio lento e giusto che veloce e sbagliato**
- **Se dopo 2 tentativi non funziona → STOP e parliamone**

## 🎯 PRIMA DI INIZIARE OGNI TASK
Scrivi 3 "Criteri di Verifica" che l'utente controllerà:
- [ ] [Risultato visibile 1]
- [ ] [Risultato visibile 2]
- [ ] [npm run build passa]

---
_Ultimo update: [DATA] | Righe: ~140/200 | Tool: Gemini CLI_
