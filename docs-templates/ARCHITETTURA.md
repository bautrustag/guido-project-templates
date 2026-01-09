# Architettura - [NOME PROGETTO]

> Questo file contiene i dettagli tecnici approfonditi.
> Consultare quando serve capire COME funziona qualcosa.

---

## Stack Tecnologico

### Frontend
| Tecnologia | Versione | Note |
|------------|----------|------|
| React | 18.x | |
| TypeScript | 5.x | |
| Tailwind CSS | 4.x | |
| [Altro] | | |

### Backend
| Tecnologia | Versione | Note |
|------------|----------|------|
| Supabase | | PostgreSQL + Auth + Storage |
| [Altro] | | |

### Infrastruttura
| Servizio | Uso |
|----------|-----|
| Vercel | Hosting frontend |
| Supabase | Database + Auth |
| [Altro] | |

---

## Struttura Database

### Tabelle principali
```
[tabella1]
├── id (UUID, PK)
├── campo1 (TEXT)
├── campo2 (INTEGER)
├── created_at (TIMESTAMP)
└── FK → [altra_tabella]

[tabella2]
├── ...
```

### Relazioni
```
[tabella1] 1──N [tabella2]
[tabella2] N──1 [tabella3]
```

### RLS Policies
| Tabella | Policy | Descrizione |
|---------|--------|-------------|
| [tabella1] | select | Users vedono solo i propri record |
| [tabella1] | insert | Users possono inserire solo per sé |

---

## Struttura Cartelle

```
src/
├── components/          # Componenti React
│   ├── ui/              # Componenti base (Button, Input, ecc.)
│   └── [feature]/       # Componenti per feature
├── lib/                 # Utility e helpers
│   ├── [service].ts     # Logica business
│   └── utils.ts         # Funzioni generiche
├── pages/               # Pagine/Routes
├── hooks/               # Custom hooks React
├── types/               # TypeScript types
│   └── index.ts         # Tipi condivisi
└── integrations/        # Client esterni (Supabase, ecc.)
```

---

## Flussi Dati Principali

### [Nome Flusso 1]
```
User Action → Component → Hook → Service → API → Database
                                              ↓
User ← UI Update ← State Update ← Response ←─┘
```

### [Nome Flusso 2]
[Descrizione]

---

## Convenzioni Codice

### Naming
- **Componenti:** PascalCase (`UserCard.tsx`)
- **Utility:** camelCase (`formatDate.ts`)
- **Tipi:** PascalCase con suffisso (`UserType`, `ApiResponse`)
- **Costanti:** SCREAMING_SNAKE_CASE

### Pattern usati
- **State management:** [Zustand / Context / Redux]
- **Data fetching:** [TanStack Query / SWR / fetch]
- **Forms:** [React Hook Form / Formik / native]

---

## File Critici

### [file1.ts] (~N righe)
- **Scopo:** [Cosa fa]
- **Perché è critico:** [Motivo]
- **Come modificarlo:** [Istruzioni]

### [file2.ts] (~N righe)
- **Scopo:** [Cosa fa]
- **Perché è critico:** [Motivo]
- **Come modificarlo:** [Istruzioni]

---

## Integrazioni Esterne

### [Servizio 1]
- **Scopo:** [Perché lo usiamo]
- **Config:** [Dove sono le config]
- **Docs:** [Link documentazione]

### [Servizio 2]
[...]

---

_Ultimo aggiornamento: [DATA]_
