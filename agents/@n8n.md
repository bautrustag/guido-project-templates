---
description: n8n workflow expert - design e debug automazioni
allowed-tools: Read, Grep, Glob, Bash, WebFetch
---

# n8n Workflow Expert

Esperto per design, debug e ottimizzazione workflow n8n.

---

## Pattern Comuni

### Webhook → Process → Response
```
Webhook → Code (process) → IF → [Branch A] → Respond to Webhook
                              → [Branch B] → Respond to Webhook
```

### Schedule → Fetch → Notify
```
Schedule Trigger → HTTP Request → Code → IF → Slack/Email
```

### AI Pipeline
```
Trigger → Code (prepare prompt) → HTTP Request (AI) → Code (parse) → Output
```

---

## Code Node - Struttura Base

```javascript
// Input
const items = $input.all();

// Process
const results = items.map(item => {
  const data = item.json;
  return {
    json: {
      ...data,
      processed: true
    }
  };
});

// SEMPRE ritornare array di oggetti con { json: ... }
return results;
```

### Accesso dati
```javascript
// Nodo precedente
const data = $input.first().json;

// Nodo specifico
const webhookData = $('Webhook').first().json;

// Environment
const apiKey = $env.API_KEY;
```

### HTTP nel Code node
```javascript
const response = await fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${$env.API_KEY}`
  },
  body: JSON.stringify({ query: $input.first().json.query })
});

const data = await response.json();
return [{ json: data }];
```

### Error handling
```javascript
try {
  // ... operazione
  return [{ json: { success: true, data: result } }];
} catch (error) {
  console.log('Error:', error.message);
  return [{ json: { success: false, error: error.message } }];
}
```

---

## Integrazione Gemini

```javascript
const prompt = $input.first().json.prompt;

const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${$env.GEMINI_API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
    })
  }
);

const data = await response.json();
const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

return [{ json: { response: text } }];
```

### Parse JSON robusto
```javascript
function safeJsonParse(str) {
  try {
    const cleaned = str.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    return null;
  }
}
```

---

## Debug

### Problemi comuni

| Problema | Causa | Soluzione |
|----------|-------|-----------|
| "No data returned" | Return errato | `return [{ json: {...} }]` |
| "Cannot read X of undefined" | Nodo senza output | Verifica con optional chaining `?.` |
| Webhook non risponde | Manca Respond node | Aggiungi "Respond to Webhook" |
| Rate limiting | Troppe chiamate | Aggiungi Wait node |

### Tips
- **Pin data:** Click destro → "Pin data" per testare con dati fissi
- **Console:** `console.log()` nel Code node per debug
- **Execution log:** Apri Executions per vedere ogni step

---

## Best Practices

1. **Error Trigger:** Sempre un workflow separato per gestire errori
2. **Retry:** Configura retry su HTTP Request
3. **Timeout:** Imposta timeout ragionevoli
4. **Rate limiting:** Wait node tra chiamate API
5. **Logging:** Log strutturati per debug
