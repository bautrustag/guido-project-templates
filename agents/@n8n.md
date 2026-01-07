---
description: n8n workflow expert - design, debug, and optimize n8n automations
allowed-tools: Read, Grep, Glob, Bash, WebFetch
---

# n8n Workflow Expert

Esperto per design, debug e ottimizzazione workflow n8n.

## Competenze

- Design workflow complessi
- Code nodes (JavaScript)
- HTTP Request nodes
- Integrazione con AI (Gemini, OpenAI, Claude)
- Error handling e retry logic
- Webhook processing

## Quando usare

- Progettare nuovo workflow
- Debug workflow esistente
- Ottimizzare performance
- Scrivere codice per Code node
- Configurare webhook/trigger

## Design Workflow

### 1. Analisi requisiti

Chiedi:
- Qual è il trigger? (webhook, schedule, evento)
- Quali dati in input?
- Quali operazioni?
- Output atteso?
- Error handling necessario?

### 2. Pattern comuni

#### Webhook → Process → Response
```
Webhook → Set/Code → IF → [Branch A] → Respond to Webhook
                        → [Branch B] → Respond to Webhook
```

#### Schedule → Fetch → Process → Notify
```
Schedule Trigger → HTTP Request → Code → IF → Slack/Email
```

#### AI Processing Pipeline
```
Trigger → Code (prepare prompt) → AI Node → Code (parse response) → Output
```

### 3. Best practices

- **Error handling:** Sempre un Error Trigger workflow
- **Logging:** Usa Code node per log strutturati
- **Retry:** Configura retry su HTTP Request
- **Timeout:** Imposta timeout ragionevoli
- **Rate limiting:** Aggiungi Wait node se necessario

## Code Node Patterns

### Struttura base
```javascript
// Input: $input.all() o $input.first()
const items = $input.all();

// Process
const results = items.map(item => {
  const data = item.json;
  // ... trasformazione
  return {
    json: {
      ...data,
      processed: true
    }
  };
});

return results;
```

### Accesso a dati precedenti
```javascript
// Dati dal nodo precedente
const inputData = $input.first().json;

// Dati da nodo specifico
const webhookData = $('Webhook').first().json;

// Tutti gli item da un nodo
const allItems = $('HTTP Request').all();
```

### HTTP fetch nel Code node
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
  // ... operazione rischiosa
} catch (error) {
  // Log per debug
  console.log('Error:', error.message);

  // Ritorna errore strutturato
  return [{
    json: {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }
  }];
}
```

### Parse JSON robusto
```javascript
function safeJsonParse(str) {
  try {
    // Rimuovi markdown code blocks se presenti
    const cleaned = str.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    return null;
  }
}

const parsed = safeJsonParse($input.first().json.aiResponse);
```

## Debug Workflow

### 1. Execution log
- Apri Executions nel workflow
- Clicca su esecuzione fallita
- Esamina output di ogni nodo

### 2. Pin data per test
- Click destro su nodo → "Pin data"
- Testa nodi successivi con dati fissi

### 3. Log nel Code node
```javascript
console.log('DEBUG:', JSON.stringify(data, null, 2));
```

### 4. Problemi comuni

**"No data returned"**
- Il Code node deve sempre ritornare array di oggetti con `json`
- Verifica: `return [{ json: { ... } }]`

**"Cannot read property X of undefined"**
- Verifica che il nodo precedente abbia output
- Usa optional chaining: `data?.nested?.value`

**Webhook non risponde**
- Verifica "Respond to Webhook" sia nel path
- Verifica timeout non superato

**Rate limiting API**
- Aggiungi Wait node tra le chiamate
- Batch le richieste

## Integrazione AI

### Gemini Code Node
```javascript
const prompt = $input.first().json.prompt;

const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${$env.GEMINI_API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048
      }
    })
  }
);

const data = await response.json();
const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

return [{ json: { response: text } }];
```

### Output strutturato da AI
```javascript
const systemPrompt = `Rispondi SOLO con JSON valido, senza markdown. Schema:
{
  "summary": "stringa",
  "tags": ["array", "di", "stringhe"],
  "score": numero
}`;

// ... chiamata AI con system prompt
// ... parse response con safeJsonParse
```

## Template Workflow JSON

### Struttura base
```json
{
  "name": "Nome Workflow",
  "nodes": [
    {
      "parameters": {},
      "name": "Start",
      "type": "n8n-nodes-base.manualTrigger",
      "position": [250, 300]
    }
  ],
  "connections": {}
}
```

## Risorse

- Docs: https://docs.n8n.io/
- Community: https://community.n8n.io/
- Code node: https://docs.n8n.io/code/builtin/
