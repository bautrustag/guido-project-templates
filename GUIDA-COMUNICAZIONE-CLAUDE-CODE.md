# 🎯 GUIDA COMUNICAZIONE CLAUDE CODE

> Tieni questa guida aperta mentre lavori. Copia-incolla i prompt template.

---

## 📋 WORKFLOW SESSIONE

```
INIZIO      →  /status (vedi dove eri)
LAVORO      →  20-25 messaggi max
RESET       →  /clear
RIPETI      →  ...
FINE        →  /close
```

**Regola d'oro:** Dopo 20-25 messaggi → `/clear`. Non aspettare che impazzisca.

---

## ✅ I TUOI PROMPT CHE FUNZIONANO

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

### 5. Conferma Prima di Procedere
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

### Quando dimentica istruzioni
```
STOP.
Rileggi CLAUDE.md e dimmi le 5 regole principali.
Poi riprova.
```

### Reset completo
```
/clear
```
Poi ricomincia con la richiesta.

---

## 🆕 NUOVA FEATURE (complessa)

### Step 1: Forza Claude Code a ragionare (USA SEMPRE)
```
PRIMA di scrivere codice:
1. Dimmi cosa hai capito della richiesta
2. Elenca i file che modificherai
3. Aspetta il mio OK

Poi procedi.
```

### Step 2: Dopo il suo piano
```
Ok, procedi. Fammi vedere dopo ogni modifica.
```

### Step 3: Verifica
```
npm run build
```

---

## 🔁 GENERARE OUTPUT PER CLAUDE.AI / GEMINI

Quando Claude Code non capisce o vuoi un secondo parere, chiedigli di prepararti un report:

### Prompt per Claude Code
```
Ho bisogno di chiedere aiuto esterno.
Generami un report con:

1. CONTESTO PROGETTO
   - Stack tecnologico
   - Struttura cartelle principale

2. COSA STO CERCANDO DI FARE
   [descrivi tu la richiesta originale]

3. COSA HAI PROVATO
   - File modificati
   - Approcci tentati
   - Errori ricevuti

4. STATO ATTUALE
   - Cosa funziona
   - Cosa non funziona
   - Eventuali errori/screenshot

Formatta tutto in modo che possa copiarlo e incollarlo.
```

### Poi copia l'output e portalo qui o su Gemini con:
```
Ecco il contesto dal mio progetto:

[INCOLLA OUTPUT CLAUDE CODE]

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

### Documentazione (il tuo prompt gold)
```
Analizza e documenta. Segui questi step:

STEP 1: Aggiorna CLAUDE.md (stato attuale)
STEP 2: Aggiorna ROADMAP.md (se serve)
STEP 3: Crea docs/[data]-sessione.md
STEP 4: Aggiorna docs/reminders.md con gotchas
STEP 5: Salva prompt in prompts/[data].md

Dimmi cosa hai creato/aggiornato.
```

---

## ⚡ COMANDI RAPIDI

| Comando | Quando |
|---------|--------|
| `/status` | Inizio sessione (include check contesto) |
| `/clear` | Ogni 20-25 messaggi |
| `/context` | Per verificare memoria usata |
| `/context-check` | Analisi dettagliata dimensioni file |
| `/optimize` | Archivia contenuti vecchi (MAI cancella) |
| `/close` | Fine giornata |
| `/audit` | Health check progetto |
| `/@debug` | Qualcosa non funziona |

### Workflow Ottimizzazione
```
/context-check     → Vedi cosa è troppo grande
/optimize          → Archivia in docs/archive/ (nulla perso)
/context-check     → Verifica miglioramento
```

---

## 🚫 COSA NON FARE

| ❌ Non fare | ✅ Fai invece |
|------------|---------------|
| Prompt vaghi ("migliora il codice") | Specifico ("il bottone X deve fare Y") |
| Fidarti del "fatto" | Chiedi `npm run build` |
| Continuare dopo 30+ messaggi | `/clear` e riparti |
| Spiegare 3 volte la stessa cosa | STOP + riformula |
| Lasciarlo inventare | "NON inventare, leggi prima" |

---

## 🧘 FRENARE CLAUDE CODE (MINDSET)

### Prompt inizio task complesso
```
Fermati un attimo.
NON partire subito a scrivere codice.
NON mettere pezze.

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
Non voglio workaround, voglio fix definitivo.

Se non sai qual è la causa, dimmelo.
```

### Quando va troppo veloce
```
Stai andando troppo veloce.
Rallenta.

Mostrami cosa hai modificato finora e perché.
Non andare avanti finché non ho capito.
```

### Da mettere in CLAUDE.md (una volta per tutte)
```
## 🧠 MINDSET

NON SONO UN CLIENTE CHE HA FRETTA. SONO UN CLIENTE CHE VUOLE QUALITÀ.

- **Non mettere pezze** — Se qualcosa non funziona, trova la causa vera
- **Non partire in quarta** — Prima capisci, poi agisci
- **Non inventare** — Se non sai, chiedi
- **Meglio lento e giusto che veloce e sbagliato**
- **Se dopo 2 tentativi non funziona → STOP e parliamone**

Preferisco che mi dici "non ho capito" piuttosto che vederti fare 5 tentativi a caso.
```

---

## 🔄 QUANDO USARE GEMINI/CLAUDE.AI (come traduttore)

| Situazione | Vai diretto | Usa traduttore |
|------------|:-----------:|:--------------:|
| Bug con screenshot | ✅ | |
| Fix piccolo | ✅ | |
| Modifica UI | ✅ | |
| Feature nuova complessa | | ✅ |
| Hai già ripetuto 2+ volte | | ✅ |
| Gira a vuoto | | ✅ |
| Decisioni architettura | | ✅ |

### Prompt per chiedere traduzione

```
CONTESTO:
Sto sviluppando [nome progetto] con Claude Code.
Stack: React/TypeScript/Supabase (o quello che è)

COSA VOGLIO:
[Descrivi in italiano cosa vuoi ottenere, come se parlassi a un collega]

COSA SO GIÀ (opzionale):
[Se sai qualcosa tipo "c'è già una pagina Contratti" dillo]

RICHIESTA:
Scrivimi il prompt completo e strutturato da dare a Claude Code 
per implementare questo. Includi:
- File probabili da modificare
- Passi in ordine
- Vincoli (cosa NON toccare)
- Come verificare che funzioni
```

### Prompt quando Claude Code gira a vuoto

```
Ho chiesto a Claude Code: "[copia il tuo prompt originale]"

Ha fatto: [cosa ha fatto di sbagliato]

Mi aspettavo: [cosa volevi]

Errore/Screenshot: [se c'è]

Come gli riformulo la richiesta?
```

---

## 💡 RICORDA

1. **Il tuo stile funziona** — screenshot, linguaggio business, feedback diretto
2. **Claude Code non impara** — se dimentica, è il contesto, non lui che "non capisce"
3. **Verifica sempre** — un `npm run build` ti salva ore
4. **20-25 messaggi poi /clear** — non aspettare
5. **Se gira a vuoto → STOP** — riformula o chiedi a me/Gemini

---

*Ultimo aggiornamento: Gennaio 2026*
