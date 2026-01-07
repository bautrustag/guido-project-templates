---
description: Debug helper - systematic error investigation and resolution
allowed-tools: Read, Grep, Glob, Bash
---

# Debug Assistant

Aiuta a investigare e risolvere errori in modo sistematico.

## Quando usare

- Errore in console (browser o terminal)
- Comportamento inatteso
- Test che falliscono
- Build che non compila

## Cosa fare

### 1. Raccogli informazioni

Chiedi all'utente (se non fornite):
- Messaggio di errore esatto
- Quando si verifica (sempre, a volte, dopo X)
- Ultima modifica fatta prima che apparisse

### 2. Analizza lo stack trace

```
🔍 ANALISI ERRORE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tipo: [TypeError | ReferenceError | SyntaxError | RuntimeError | ...]
Messaggio: [messaggio esatto]
File: [path:linea]
```

### 3. Investigazione sistematica

#### A. Localizza il punto esatto
```bash
# Cerca il file indicato nello stack trace
# Leggi le linee intorno all'errore
```

#### B. Traccia il flusso dati
- Da dove arriva il valore problematico?
- Qual è la catena di chiamate?
- Dove viene modificato?

#### C. Check comuni per tipo di errore

**TypeError: Cannot read property 'X' of undefined/null**
- [ ] L'oggetto esiste prima dell'accesso?
- [ ] Dati asincroni non ancora caricati?
- [ ] Optional chaining mancante (`?.`)
- [ ] Destructuring da oggetto nullo?

**ReferenceError: X is not defined**
- [ ] Import mancante?
- [ ] Typo nel nome variabile?
- [ ] Scope errato?

**Network Error / Fetch failed**
- [ ] URL corretto?
- [ ] CORS configurato?
- [ ] Server running?
- [ ] Auth token valido?

**Build Error**
- [ ] Sintassi errata?
- [ ] Import circolare?
- [ ] Tipi TypeScript incompatibili?
- [ ] Dipendenza mancante?

**React: Too many re-renders**
- [ ] State update in render?
- [ ] useEffect senza deps?
- [ ] Callback che cambia identità?

**Supabase Error**
- [ ] RLS policy blocca?
- [ ] Foreign key constraint?
- [ ] Column not found = typo o migration mancante?

### 4. Ipotesi e test

Genera 2-3 ipotesi ordinate per probabilità:

```
📋 IPOTESI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. [Ipotesi più probabile]
   - Verifica: [come testare]

2. [Seconda ipotesi]
   - Verifica: [come testare]

3. [Terza ipotesi]
   - Verifica: [come testare]
```

### 5. Debug interattivo

Se serve più info:
```typescript
// Aggiungi log temporanei
console.log('[DEBUG] variabile:', variabile);
console.log('[DEBUG] stato prima:', JSON.stringify(stato, null, 2));
```

### 6. Soluzione

Quando trovi la causa:

```
✅ SOLUZIONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Causa: [spiegazione chiara]

Fix:
[codice corretto]

Prevenzione futura:
- [come evitare che ricapiti]
```

### 7. Aggiorna REMINDERS.md

Se è un errore non ovvio, aggiungi entry in `docs/REMINDERS.md`:

```markdown
### [Categoria] - [Problema]
- **Problema:** [descrizione]
- **Causa:** [cosa lo causava]
- **Soluzione:** [fix applicato]
- **Data:** YYYY-MM-DD
```

## Quick Debug Commands

```bash
# TypeScript errors
npx tsc --noEmit

# Lint errors
npm run lint

# Test specifico
npm test -- --grep "nome test"

# React dev tools
# Apri console browser > Components/Profiler

# Supabase logs
npx supabase functions logs nome-funzione
```

## Note

- Non indovinare, investiga
- Usa console.log strategici, non a caso
- Rimuovi i log di debug dopo aver risolto
- Se il problema persiste dopo 15 min, chiedi aiuto o prova approccio diverso
