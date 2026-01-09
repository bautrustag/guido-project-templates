---
description: Gemini prompt expert - ottimizza prompt per Google Gemini
allowed-tools: Read, Grep, Glob, WebFetch
---

# Gemini Prompt Expert

Ottimizza prompt e integra Google Gemini API.

---

## Modelli

| Modello | Uso | Context |
|---------|-----|---------|
| gemini-2.0-flash | Default, veloce | 1M tokens |
| gemini-1.5-pro | Ragionamento complesso | 2M tokens |
| gemini-1.5-flash | Economico | 1M tokens |

---

## Struttura Prompt Efficace

```
[RUOLO]
Sei un [ruolo] esperto in [dominio].

[CONTESTO]
[Background necessario]

[TASK]
[Cosa deve fare - chiaro e specifico]

[FORMATO OUTPUT]
[Come strutturare la risposta]

[VINCOLI]
- [Cosa NON fare]
- [Limiti]

[ESEMPI] (opzionale)
Input: [esempio]
Output: [output atteso]
```

---

## Output JSON

### Prompt per JSON
```
Rispondi ESCLUSIVAMENTE con JSON valido.
NON includere markdown, commenti o testo.
NON usare ```json``` code blocks.

Schema:
{
  "campo1": "string",
  "campo2": ["array"]
}
```

### Parse robusto
```typescript
function parseGeminiJson(text: string) {
  let cleaned = text
    .replace(/```json\n?/gi, '')
    .replace(/```\n?/g, '')
    .trim();
  
  const start = cleaned.search(/[\[{]/);
  if (start > 0) cleaned = cleaned.slice(start);
  
  const end = Math.max(cleaned.lastIndexOf('}'), cleaned.lastIndexOf(']'));
  if (end > 0) cleaned = cleaned.slice(0, end + 1);
  
  return JSON.parse(cleaned);
}
```

---

## API Call

```typescript
async function callGemini(prompt: string, options?: {
  model?: string;
  temperature?: number;
}) {
  const model = options?.model || 'gemini-2.0-flash';
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: options?.temperature ?? 0.7,
          maxOutputTokens: 2048,
        }
      })
    }
  );
  
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}
```

---

## Ottimizzazione

### Vago → Specifico
```
❌ "Scrivi un articolo sul marketing"

✅ "Scrivi un articolo di 500 parole sul content marketing 
   per e-commerce. Target: marketing manager. 
   Includi 3 strategie con esempi."
```

### Output inconsistente → Vincoli
```
❌ "Elenca i vantaggi"

✅ "Elenca esattamente 5 vantaggi in formato:
   - **[Nome]**: [Spiegazione in 1 frase]"
```

### Temperature
```typescript
temperature: 0.1  // Task precisi (estrazione, classificazione)
temperature: 0.9  // Task creativi (copywriting, brainstorming)
```

---

## Pattern Avanzati

### Chain of Thought
```
Prima di rispondere, ragiona passo passo:
1. Analizza il problema
2. Considera le opzioni
3. Scegli la migliore
4. Rispondi

Mostra il ragionamento.
```

### Few-shot
```
Esempi:

Input: "Prodotto non funziona"
Output: { "categoria": "reclamo", "urgenza": "alta" }

Input: "Quando arriva l'ordine?"
Output: { "categoria": "tracking", "urgenza": "media" }

Ora classifica:
Input: "[TESTO]"
Output:
```

---

## Costi (per 1M token)

| Modello | Input | Output |
|---------|-------|--------|
| gemini-2.0-flash | $0.075 | $0.30 |
| gemini-1.5-pro | $1.25 | $5.00 |

**Tip:** Usa flash per quasi tutto, pro solo per ragionamento complesso.
