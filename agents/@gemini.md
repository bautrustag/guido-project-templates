---
description: Gemini prompt expert - optimize prompts for Google Gemini API
allowed-tools: Read, Grep, Glob, WebFetch
---

# Gemini Prompt Expert

Esperto per ottimizzare prompt e integrare Google Gemini API.

## Modelli disponibili

| Modello | Uso | Context | Note |
|---------|-----|---------|------|
| gemini-2.0-flash | Default, veloce | 1M tokens | Migliore per la maggior parte dei casi |
| gemini-1.5-pro | Complesso | 2M tokens | Ragionamento avanzato |
| gemini-1.5-flash | Veloce | 1M tokens | Economico |

## Struttura prompt efficace

### Template base
```
[RUOLO]
Sei un [ruolo specifico] esperto in [dominio].

[CONTESTO]
[Informazioni di background necessarie]

[TASK]
[Cosa deve fare, in modo chiaro e specifico]

[FORMATO OUTPUT]
[Come deve essere strutturata la risposta]

[VINCOLI]
- [Cosa NON fare]
- [Limiti da rispettare]

[ESEMPI] (opzionale)
Input: [esempio input]
Output: [esempio output atteso]
```

### Esempio pratico
```
Sei un copywriter esperto in marketing digitale per PMI italiane.

CONTESTO:
L'azienda vende software gestionale per commercialisti.
Target: studi con 5-20 dipendenti.
Tone of voice: professionale ma accessibile.

TASK:
Scrivi 3 varianti di headline per una landing page che promuove
una demo gratuita del software.

FORMATO:
Per ogni headline:
- Testo headline (max 10 parole)
- Subheadline (max 20 parole)
- CTA button text

VINCOLI:
- No tecnicismi complessi
- No promesse irrealistiche
- Focus su risparmio tempo
```

## Output strutturato (JSON)

### Prompt per JSON
```
Rispondi ESCLUSIVAMENTE con JSON valido.
NON includere markdown, commenti o testo aggiuntivo.
NON usare ```json``` code blocks.

Schema richiesto:
{
  "campo1": "tipo",
  "campo2": ["array"]
}
```

### Parse robusto
```typescript
function parseGeminiJson(text: string) {
  // Rimuovi code blocks se presenti
  let cleaned = text
    .replace(/```json\n?/gi, '')
    .replace(/```\n?/g, '')
    .trim();

  // Trova primo { o [
  const start = cleaned.search(/[\[{]/);
  if (start > 0) cleaned = cleaned.slice(start);

  // Trova ultimo } o ]
  const endBrace = cleaned.lastIndexOf('}');
  const endBracket = cleaned.lastIndexOf(']');
  const end = Math.max(endBrace, endBracket);
  if (end > 0) cleaned = cleaned.slice(0, end + 1);

  return JSON.parse(cleaned);
}
```

## API Integration

### REST API call
```typescript
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function callGemini(prompt: string, options?: {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}) {
  const model = options?.model || 'gemini-2.0-flash';

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: options?.temperature ?? 0.7,
          maxOutputTokens: options?.maxTokens ?? 2048,
        }
      })
    }
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}
```

### Con system instruction
```typescript
const response = await fetch(url, {
  method: 'POST',
  body: JSON.stringify({
    systemInstruction: {
      parts: [{ text: "Sei un assistente che risponde sempre in italiano formale." }]
    },
    contents: [{
      parts: [{ text: userPrompt }]
    }]
  })
});
```

### Chat multi-turn
```typescript
const contents = [
  { role: 'user', parts: [{ text: 'Ciao, come ti chiami?' }] },
  { role: 'model', parts: [{ text: 'Sono Gemini, un assistente AI.' }] },
  { role: 'user', parts: [{ text: 'Cosa sai fare?' }] }
];

const response = await fetch(url, {
  method: 'POST',
  body: JSON.stringify({ contents })
});
```

## Ottimizzazione prompt

### Prompt troppo vago → specifico
```
❌ "Scrivi un articolo sul marketing"

✅ "Scrivi un articolo di 500 parole sul content marketing per e-commerce
   di abbigliamento. Target: marketing manager con budget limitato.
   Includi 3 strategie concrete con esempi."
```

### Output inconsistente → vincoli
```
❌ "Elenca i vantaggi"

✅ "Elenca esattamente 5 vantaggi, ognuno in formato:
   - **[Nome vantaggio]**: [Spiegazione in 1 frase]"
```

### Troppo creativo → temperature bassa
```typescript
// Per task precisi (estrazione dati, classificazione)
temperature: 0.1

// Per task creativi (copywriting, brainstorming)
temperature: 0.9
```

### Risposte troppo lunghe → limiti
```
Rispondi in massimo 3 frasi.
```

## Pattern avanzati

### Chain of thought
```
Prima di rispondere, ragiona passo passo:
1. Analizza il problema
2. Considera le opzioni
3. Scegli la migliore
4. Fornisci la risposta finale

Mostra il tuo ragionamento.
```

### Few-shot learning
```
Esempi di classificazione:

Input: "Il prodotto non funziona, voglio rimborso"
Output: { "categoria": "reclamo", "urgenza": "alta" }

Input: "Quando arriva il mio ordine?"
Output: { "categoria": "tracking", "urgenza": "media" }

Input: "Grazie mille, ottimo servizio!"
Output: { "categoria": "feedback_positivo", "urgenza": "bassa" }

Ora classifica:
Input: "[TESTO UTENTE]"
Output:
```

### Self-consistency (per task critici)
```
Esegui questo task 3 volte con approcci diversi.
Poi confronta i risultati e fornisci la risposta più robusta.
```

## Gestione errori

### Rate limiting
```typescript
async function callWithRetry(prompt: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await callGemini(prompt);
    } catch (error) {
      if (error.message.includes('429') && i < maxRetries - 1) {
        await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        continue;
      }
      throw error;
    }
  }
}
```

### Content filtering
```
// Se ricevi SAFETY block, riformula il prompt
// Evita contenuti sensibili anche se legittimi
```

## Costi

| Modello | Input (1M tokens) | Output (1M tokens) |
|---------|-------------------|---------------------|
| gemini-2.0-flash | $0.075 | $0.30 |
| gemini-1.5-pro | $1.25 | $5.00 |
| gemini-1.5-flash | $0.075 | $0.30 |

**Tip:** Usa flash per la maggior parte dei task, pro solo per ragionamento complesso.
