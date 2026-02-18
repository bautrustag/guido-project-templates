# Gestione Contesto Claude Code

> ⚠️ **LEGGI QUESTO FILE** se Claude Code:
> - Dimentica cose dette pochi messaggi prima
> - Fa regressioni (rompe codice che funzionava)
> - Dice "fatto" senza aver fatto
> - Ignora istruzioni che gli hai dato

---

## Il Problema

Claude Code ha una "memoria" limitata chiamata **context window** (200.000 token).

Ogni volta che apri Claude Code, vengono caricati automaticamente:
- System prompt (~18k token) - fisso, non modificabile
- **CLAUDE.md** - QUESTO È IL PROBLEMA SE TROPPO GRANDE
- Messaggi della conversazione

**Se CLAUDE.md è troppo grande**, Claude parte già "stanco" e ha poco spazio per ragionare.

---

## Verifica il Tuo Contesto

Esegui questo comando in Claude Code:

```
/context
```

### Come leggere il risultato

```
Memory files: 52.2k tokens (26.1%)  ← ❌ TROPPO ALTO
Memory files: 12.6k tokens (6.3%)   ← ⚠️ ALTO  
Memory files: 3.0k tokens (1.5%)    ← ✅ OTTIMO
```

### Target

| Elemento | Limite | Token stimati |
|----------|--------|---------------|
| CLAUDE.md | < 80 righe | < 3k token |
| Memory files totali | < 5% | < 10k token |

---

## Comandi Essenziali

### /context
Mostra quanto contesto stai usando. **Eseguilo spesso.**

### /clear
Resetta il contesto. **USA DOPO OGNI TASK COMPLETATO.**

```
/clear
```

### /memory
Apre CLAUDE.md per modificarlo.

---

## Regola dei 20 Messaggi

Dopo circa **20 messaggi** di scambio, il contesto inizia a saturarsi.

**Segnali di saturazione:**
- Claude ripete cose già dette
- Claude "dimentica" modifiche appena fatte
- Claude propone soluzioni già scartate
- Risposte più lente o generiche

**Azione:** Fai `/clear` e riparti.

---

## Metodo "Document & Clear"

Per task lunghi (>15 messaggi), usa questo metodo:

### STEP 1: Prima di /clear
Chiedi a Claude:
```
Salva lo stato attuale in docs/progress-[nome-task].md:
- Cosa abbiamo fatto
- Cosa resta da fare  
- Problemi incontrati
- File modificati
```

### STEP 2: Esegui
```
/clear
```

### STEP 3: Riparti
```
Leggi docs/progress-[nome-task].md e continua da dove eravamo.
```

---

## Cosa NON Mettere in CLAUDE.md

| ❌ NON mettere | ✅ Dove metterlo |
|----------------|------------------|
| Storico sessioni | `docs/STORICO-SESSIONI.md` |
| Bug risolti nel passato | `docs/REMINDERS.md` |
| Dettagli architetturali | `docs/ARCHITETTURA.md` |
| Decisioni storiche | `ROADMAP.md` |
| Codice di esempio lungo | File dedicato in `docs/` |
| Changelog | `docs/CHANGELOG.md` |

---

## Cosa DEVE Stare in CLAUDE.md

| ✅ Elemento | Righe |
|-------------|-------|
| Stack (1 riga) | 1-2 |
| Comandi essenziali | 3-5 |
| File critici con regole | 5-10 |
| Regole anti-regressione | 10-15 |
| Link a documentazione | 5-10 |
| TODO prossimi passi | 5-10 |
| **TOTALE** | **< 80** |

---

## Manutenzione Mensile

Ogni mese, verifica:

```
[ ] CLAUDE.md < 80 righe? (wc -l CLAUDE.md)
[ ] /context mostra Memory files < 5%?
[ ] Storico sessioni è in docs/, non in CLAUDE.md?
[ ] Nessun contenuto obsoleto in CLAUDE.md?
[ ] REMINDERS.md aggiornato con ultimi bug?
```

---

## Risoluzione Problemi

### "Claude dimentica tutto"
1. Esegui `/context` - probabilmente Memory files > 20%
2. Riduci CLAUDE.md spostando contenuti in docs/
3. Fai `/clear` e riparti

### "Claude fa sempre gli stessi errori"
1. L'errore è documentato in `docs/REMINDERS.md`?
2. Se no, aggiungilo
3. Se sì, verifica che CLAUDE.md punti a REMINDERS.md

### "Claude rompe cose che funzionavano"
1. Stai lavorando su file >500 righe?
2. Chiedi a Claude di modificare SOLO la funzione specifica
3. Fai `/clear` tra task diversi

### "La sessione è diventata lentissima"
1. Esegui `/context`
2. Probabilmente sei oltre il 70% di utilizzo
3. Usa il metodo "Document & Clear"

---

## Quick Reference

```
/context          → Vedi quanto contesto usi
/clear            → Resetta (USA SPESSO!)
/memory           → Modifica CLAUDE.md

Regola d'oro: /clear dopo ogni task completato
Limite: CLAUDE.md < 80 righe
Target: Memory files < 5%
```

---

_Questa guida è basata su diagnosi reali di progetti con problemi di contesto._
