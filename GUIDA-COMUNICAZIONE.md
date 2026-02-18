# 🎯 GUIDA COMUNICAZIONE AI CODING ASSISTANTS

> Tieni questa guida aperta mentre lavori. Vale per tutti i tool: Claude Code, Codex, Gemini, Kimi (Aider).

---

## 📋 WORKFLOW SESSIONE (qualsiasi tool)

```
INIZIO      →  /status (vedi dove eri rimasto)
LAVORO      →  20-25 messaggi max (Claude Code) / task-based (Codex/Gemini/Kimi)
PAUSA       →  /clear-safe → salva stato nei file condivisi
RESET       →  /clear (Claude Code) o nuovo contesto
FINE        →  /close o /clear-safe
SWITCH TOOL →  /clear-safe → apri altro tool → /status
```

**Regola d'oro:** Quando switchi tool, il nuovo AI legge gli stessi file condivisi e riparte.

---

## 🔄 COME SWITCHARE TOOL

### Da Claude Code a Codex/Gemini/Kimi
```
1. In Claude Code: /clear-safe
2. Apri Codex, Gemini o Kimi
3. "Leggi CODEX.md (o GEMINI.md o KIMI.md) e docs/SESSION-STATE.md, poi dimmi dove siamo"
```

### Da Kimi a Claude Code
```
1. In Kimi (Aider): /clear-safe (digitalo come testo)
2. /exit per uscire da Aider
3. Apri Claude Code: claude
4. /status
```

### Da qualsiasi tool a Kimi
```
1. /clear-safe nel tool corrente
2. Apri Kimi: kimi
3. /status
```

> **Nota Kimi (Aider):** Aider legge automaticamente KIMI.md e docs/ grazie a .aider.conf.yml.
> I comandi /status, /clear-safe, /storico funzionano come testo — Aider li interpreterà.

---

## ✅ PROMPT CHE FUNZIONANO (tutti i tool)

### 1. Screenshot + Descrizione
```
[screenshot]
Quando faccio X succede Y. Dovrebbe succedere Z.
```

### 2. Lista Problemi
```
Problemi da fixare:
1. /pagina non carica
2. Bottone X non funziona
3. Vedo bianco invece di Y
```

### 3. Richiesta Business
```
Voglio che [tipo utente] possa vedere solo [cosa].
Non deve poter fare [cosa].
```

### 4. Feedback Diretto
```
Questo fa schifo. Rifallo.
[screenshot di cosa non va]
```

### 5. Conferma
```
Ok, mi sembra corretto. Procedi.
```

---

## 🛑 PROMPT DI EMERGENZA

### Quando gira a vuoto (dopo 2 tentativi)
```
STOP.
Hai già provato 2 volte e non funziona.
NON provare una terza volta a caso.

Dimmi:
1. Cosa hai provato
2. Perché pensi non abbia funzionato
3. Cosa ti serve sapere per risolvere davvero
```

### Quando dice "fatto" ma non ti fidi
```
Mostrami cosa hai cambiato.
Poi esegui npm run build e mostrami l'output.
```

### Quando inventa cose
```
STOP. Non inventare.
Leggi il file [X] e dimmi cosa c'è REALMENTE.
Se non sai qualcosa, chiedi.
```

---

## 🆕 NUOVA FEATURE (complessa)

### Step 1: Forza il ragionamento (USA SEMPRE)
```
PRIMA di scrivere codice:
1. Dimmi cosa hai capito della richiesta
2. Elenca i file che modificherai
3. Aspetta il mio OK

Poi procedi.
```

### Step 2: Dopo il piano
```
Ok, procedi. Fammi vedere dopo ogni modifica.
```

### Step 3: Verifica
```
npm run build
```

---

## 🔁 GENERARE OUTPUT PER ALTRO TOOL

Quando un tool non capisce o vuoi un secondo parere:

### Chiedi al tool corrente di preparare un report
```
Ho bisogno di chiedere aiuto esterno.
Generami un report con:

1. CONTESTO: Stack, struttura
2. COSA STO CERCANDO DI FARE: [richiesta]
3. COSA HAI PROVATO: file modificati, approcci, errori
4. STATO ATTUALE: cosa funziona, cosa no

Formatta per copia-incolla.
```

### Porta il report sull'altro tool
```
Ecco il contesto dal mio progetto:
[INCOLLA OUTPUT]
Come risolvo?
```

---

## 🐛 BUG FIX

### Prompt standard
```
[screenshot]
Bug: [cosa succede]
Atteso: [cosa dovrebbe succedere]
Pagina/URL: [dove]
```

### Se non trova il problema
```
Il problema è in [pagina].
Leggi il file e dimmi cosa fa quando [azione].
NON modificare ancora, prima dimmi cosa hai trovato.
```

---

## 📝 FINE SESSIONE

### Documentazione (prompt gold — vale per tutti)
```
/clear-safe
```

Questo aggiorna automaticamente:
- `docs/SESSION-STATE.md` (stato attuale)
- `docs/STORICO-SESSIONI.md` (cosa hai fatto + quale tool)
- `docs/REMINDERS.md` (se hai risolto bug non ovvi)

---

## ⚡ COMANDI RAPIDI

| Comando | Quando | Note |
|---------|--------|------|
| `/status` | Inizio sessione | Tutti i tool |
| `/clear-safe` | Prima di switch/reset | Tutti i tool |
| `/clear` | Ogni 20-25 messaggi | Solo Claude Code (built-in) |
| `/close` | Fine giornata | Tutti i tool |
| `/audit` | Health check | Solo Claude Code |
| `/@debug` | Errore da investigare | Solo Claude Code |
| `/storico` | Vedere cronologia | Tutti i tool |

---

## ⚡ COMANDI SPECIFICI AIDER (Kimi)

| Comando Aider | Cosa fa |
|---------------|---------|
| `/add file.ts` | Aggiunge file al contesto (Aider può modificarlo) |
| `/drop file.ts` | Rimuove file dal contesto |
| `/ls` | Mostra file nel contesto |
| `/run npm run build` | Esegue comando shell |
| `/undo` | Annulla ultima modifica |
| `/exit` | Esci da Aider |

> I comandi /status, /clear-safe, /storico in Aider si scrivono come testo normale — Kimi li interpreta grazie a KIMI.md.

---

## 🔄 QUANDO USARE QUALE TOOL

| Situazione | Claude Code | Codex | Gemini | Kimi (Aider) |
|------------|:-----------:|:-----:|:------:|:------------:|
| Bug fix con screenshot | ✅ | ✅ | ✅ | |
| Feature piccola | ✅ | ✅ | ✅ | ✅ |
| Feature complessa | ✅ | | | ✅ |
| Refactoring grande | | ✅ | ✅ | ✅ |
| Ragionamento architettura | | | ✅ | ✅ |
| Batch di modifiche simili | | ✅ | | |
| Debug interattivo | ✅ | | | |
| Code review | | | ✅ | ✅ |
| File molto grandi | | | ✅ | ✅ |
| Coding agentico | ✅ | | | ✅ |
| Alternativa economica | | | | ✅ |

---

## 🧘 FRENARE L'AI (MINDSET — vale per tutti)

### Prompt inizio task complesso
```
Fermati un attimo.
NON partire subito a scrivere codice.

Prima:
1. Dimmi cosa hai capito
2. Dimmi qual è la causa del problema (non i sintomi)
3. Dimmi la soluzione corretta (non un workaround)
4. Aspetta il mio OK

Se non sei sicuro di qualcosa, chiedi.
```

### Quando sta mettendo pezze
```
STOP.
Questa sembra una pezza, non una soluzione.
Qual è la CAUSA VERA del problema?
```

### Quando va troppo veloce
```
Stai andando troppo veloce. Rallenta.
Mostrami cosa hai modificato finora e perché.
```

---

## 🚫 COSA NON FARE

| ❌ Non fare | ✅ Fai invece |
|------------|---------------|
| Prompt vaghi ("migliora il codice") | Specifico ("il bottone X deve fare Y") |
| Fidarti del "fatto" | Chiedi `npm run build` |
| Continuare dopo 30+ messaggi | `/clear-safe` e riparti |
| Spiegare 3 volte la stessa cosa | STOP + riformula |
| Lasciarlo inventare | "NON inventare, leggi prima" |
| Switchare tool senza salvare | SEMPRE `/clear-safe` prima |

---

## 💡 RICORDA

1. **Il tuo stile funziona** — screenshot, linguaggio business, feedback diretto
2. **Gli AI non imparano tra sessioni** — per questo esistono i file condivisi
3. **Verifica sempre** — un `npm run build` ti salva ore
4. **Switch tool = `/clear-safe` prima** — mai switchare senza salvare
5. **Se gira a vuoto → STOP** — riformula o cambia tool
6. **Kimi è economico** — usa Kimi per task intensivi dove il costo conta

---

*Ultimo aggiornamento: Febbraio 2026*
