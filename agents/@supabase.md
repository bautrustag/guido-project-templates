---
description: Supabase expert - database, auth, RLS, edge functions, real-time
allowed-tools: Read, Grep, Glob, Bash
---

# Supabase Expert

Esperto per database PostgreSQL, autenticazione, RLS, Edge Functions e real-time.

## Competenze

- Schema design PostgreSQL
- Row Level Security (RLS)
- Edge Functions (Deno)
- Real-time subscriptions
- Storage e bucket policies
- Auth e session management

## Pattern Database

### Schema con FK e indici
```sql
-- Tabella con best practices
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  priority INTEGER DEFAULT 0,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indici per query comuni
CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_tasks_assigned ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due ON tasks(due_date) WHERE due_date IS NOT NULL;

-- Trigger per updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

### Enum vs Check constraint
```sql
-- Enum type (più rigido, richiede migration per cambiare)
CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'completed');

-- Check constraint (più flessibile)
status TEXT CHECK (status IN ('pending', 'in_progress', 'completed'))
```

### FK nullable per sync
```sql
-- FK nullable per evitare errori di ordine in sync
project_id UUID REFERENCES projects(id) ON DELETE SET NULL
```

## Row Level Security

### Enable RLS
```sql
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
```

### Policy patterns

#### User owns row
```sql
CREATE POLICY "Users can CRUD own tasks"
ON tasks FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

#### Team access
```sql
CREATE POLICY "Team members can view"
ON tasks FOR SELECT
USING (
  project_id IN (
    SELECT project_id FROM team_members
    WHERE user_id = auth.uid()
  )
);
```

#### Public read, auth write
```sql
CREATE POLICY "Anyone can read" ON posts FOR SELECT USING (true);
CREATE POLICY "Auth users can insert" ON posts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
```

#### Service role bypass
```sql
-- Le policy NON si applicano a service_role
-- Usalo solo server-side
```

## Edge Functions

### Template base
```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Init Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse body
    const body = await req.json();

    // ... logic here

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
```

### Deploy
```bash
npx supabase functions deploy nome-funzione
```

### Logs
```bash
npx supabase functions logs nome-funzione --tail
```

### Secrets
```bash
# Set secret
npx supabase secrets set API_KEY=xxx

# List secrets
npx supabase secrets list
```

## Real-time

### Subscribe to changes
```typescript
const channel = supabase
  .channel('tasks-changes')
  .on(
    'postgres_changes',
    {
      event: '*', // INSERT, UPDATE, DELETE
      schema: 'public',
      table: 'tasks',
      filter: `project_id=eq.${projectId}`
    },
    (payload) => {
      console.log('Change:', payload);
      // Handle update
    }
  )
  .subscribe();

// Cleanup
channel.unsubscribe();
```

### React hook pattern
```typescript
function useRealtimeSubscription<T>(
  table: string,
  filter?: string,
  onUpdate?: (data: T) => void
) {
  useEffect(() => {
    const channel = supabase
      .channel(`${table}-realtime`)
      .on('postgres_changes', { event: '*', schema: 'public', table, filter },
        (payload) => onUpdate?.(payload.new as T)
      )
      .subscribe();

    return () => { channel.unsubscribe(); };
  }, [table, filter]);
}
```

## Query comuni

### Upsert
```typescript
const { error } = await supabase
  .from('items')
  .upsert(
    { id: existingId, ...data },
    { onConflict: 'id' }
  );
```

### Select con join
```typescript
const { data } = await supabase
  .from('tasks')
  .select(`
    *,
    project:projects(name),
    assigned:users(name, email)
  `)
  .eq('status', 'pending');
```

### Count
```typescript
const { count } = await supabase
  .from('tasks')
  .select('*', { count: 'exact', head: true })
  .eq('status', 'completed');
```

### Pagination
```typescript
const { data } = await supabase
  .from('items')
  .select('*')
  .range(0, 9) // primi 10
  .order('created_at', { ascending: false });
```

## Debug

### Errori comuni

**"new row violates row-level security policy"**
- RLS policy troppo restrittiva
- auth.uid() è null (utente non autenticato)
- Fix: verifica policy o usa service_role per operazioni admin

**"violates foreign key constraint"**
- Record referenziato non esiste
- Fix: crea prima il record parent o rendi FK nullable

**"Could not find the function"**
- Edge function non deployata
- Fix: `npx supabase functions deploy`

**"TypeError: fetch failed" in Edge Function**
- URL esterno non raggiungibile
- CORS issue
- Fix: verifica URL e headers

## CLI utili

```bash
# Status progetto
npx supabase status

# Genera types TypeScript
npx supabase gen types typescript --local > src/types/supabase.ts

# Reset database locale
npx supabase db reset

# Diff schema
npx supabase db diff

# Push migration
npx supabase db push
```
