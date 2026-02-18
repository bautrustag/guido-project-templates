# Optimize - Archive Content to Free Context

## ⚠️ GOLDEN RULE

**NEVER DELETE ANYTHING. ONLY ARCHIVE.**

Tutto il contenuto rimosso dai file principali DEVE essere salvato in `docs/archive/`.

---

## Istruzioni per Claude

Quando l'utente invoca `/optimize`, esegui questi step:

### STEP 0: Crea cartella archive se non esiste

```bash
mkdir -p docs/archive
```

### STEP 1: Analizza cosa ottimizzare

```bash
echo "=== ANALISI FILES ==="
wc -l CLAUDE.md ROADMAP.md docs/*.md 2>/dev/null | sort -rn
```

Identifica i file che superano le soglie:
- CLAUDE.md > 100 righe
- ROADMAP.md > 300 righe  
- docs/*.md > 200 righe (singolo file)

### STEP 2: Ottimizza CLAUDE.md (se > 100 righe)

**Cosa ARCHIVIARE:**
- Storico sessioni → `docs/archive/storico-claude.md`
- Dettagli tecnici completati → `docs/archive/dettagli-tecnici.md`
- Bug risolti → `docs/archive/bug-risolti.md`

**Cosa TENERE in CLAUDE.md:**
- Stack tecnologico (max 5 righe)
- Comandi principali (max 10 righe)
- File critici (max 10 righe)
- Regole anti-regressione (max 15 righe)
- Prossimi passi (max 10 righe)
- Sezione MINDSET (max 10 righe)

**Procedura:**
1. Leggi CLAUDE.md
2. Identifica sezioni da archiviare
3. COPIA (non taglia) in docs/archive/storico-claude.md con data
4. Riscrivi CLAUDE.md mantenendo solo l'essenziale
5. Aggiungi in CLAUDE.md riferimento: `## 📁 Archivio: docs/archive/`

### STEP 3: Ottimizza ROADMAP.md (se > 300 righe)

**Cosa ARCHIVIARE:**
- Fasi COMPLETATE → `docs/archive/roadmap-completate.md`
- Dettagli implementativi passati

**Cosa TENERE:**
- Fase corrente (dettagliata)
- Prossime 2-3 fasi (outline)
- Backlog (solo titoli)

**Procedura:**
1. Identifica fasi con stato "✅ COMPLETATA"
2. COPIA in docs/archive/roadmap-completate.md
3. In ROADMAP.md sostituisci con: `✅ FASE X - COMPLETATA (vedi docs/archive/roadmap-completate.md)`

### STEP 4: Ottimizza docs/reminders.md (se > 200 righe)

**Cosa ARCHIVIARE:**
- Storico errori risolti → `docs/archive/storico-errori.md`
- Reference dettagliate → `docs/archive/reference-[topic].md`
- Sezioni specifiche poco usate

**Cosa TENERE:**
- Anti-pattern attivi (regole critiche)
- Checklist obbligatorie
- Errori frequenti (top 5-10)

**Procedura:**
1. COPIA sezioni storiche in archive
2. Mantieni solo regole attive
3. Aggiungi indice: `## 📁 Reference: docs/archive/`

### STEP 5: Ottimizza docs/storico-sessioni.md (se > 200 righe)

**Cosa ARCHIVIARE:**
- Sessioni più vecchie di 30 giorni → `docs/archive/storico-sessioni-[mese].md`

**Cosa TENERE:**
- Ultime 5-10 sessioni
- Sessioni con decisioni architetturali importanti

**Procedura:**
1. Identifica sessioni > 30 giorni
2. COPIA in file mensile (es: `storico-sessioni-2025-12.md`)
3. Mantieni riferimento: `Sessioni precedenti: docs/archive/storico-sessioni-*.md`

### STEP 6: Verifica e Report

```bash
echo "=== DOPO OTTIMIZZAZIONE ==="
wc -l CLAUDE.md ROADMAP.md docs/*.md 2>/dev/null | sort -rn
echo ""
echo "=== FILE ARCHIVIATI ==="
ls -la docs/archive/
```

**Output Report:**

```
## 📊 OTTIMIZZAZIONE COMPLETATA

| File | Prima | Dopo | Archiviato in |
|------|-------|------|---------------|
| CLAUDE.md | XXX | YY | docs/archive/storico-claude.md |
| ROADMAP.md | XXX | YY | docs/archive/roadmap-completate.md |
| reminders.md | XXX | YY | docs/archive/storico-errori.md |
| ... | ... | ... | ... |

### File in docs/archive/
- storico-claude.md (XX righe)
- roadmap-completate.md (XX righe)
- storico-errori.md (XX righe)
- ...

✅ Nessun contenuto perso. Tutto archiviato e accessibile.
```

### STEP 7: Verifica Build

```bash
npm run build
```

---

## Template File Archiviati

Ogni file in archive deve iniziare con:

```markdown
# [Nome Contenuto] - Archivio

> **Archiviato da:** /optimize
> **Data:** [data]
> **Fonte originale:** [file]

---

[contenuto archiviato]
```

---

## Rollback

Se serve recuperare contenuto archiviato:

```bash
# Visualizza contenuto archiviato
cat docs/archive/[file].md

# Copia sezione specifica (manualmente)
```

L'utente può sempre:
1. Aprire docs/archive/[file].md
2. Copiare la sezione necessaria
3. Incollarla dove serve

---

## Frequenza Consigliata

- Esegui `/context-check` a inizio sessione
- Esegui `/optimize` quando suggerito (tipicamente ogni 1-2 settimane)
- Mai eseguire `/optimize` senza prima `/context-check`
