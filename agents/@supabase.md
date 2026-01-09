---
description: Supabase expert - database, RLS, Edge Functions
allowed-tools: Read, Grep, Glob, Bash
---

# Supabase Expert

Esperto per PostgreSQL, RLS, Edge Functions e real-time.

---

## Pattern Database

### Schema con Best Practices
```sql
CREATE TABLE IF NOT EXISTS items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'done')),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indici per query comuni
CREATE INDEX idx_items_user ON items(user_id);
CREATE INDEX idx_items_status ON items(status);

-- Trigger updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER items_updated
  BEFORE UPDATE ON items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

## Row Level Security

### Enable
```sql
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
```

### Pattern: User owns row
```sql
CREATE POLICY "Users CRUD own items"
ON items FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

### Pattern: Public read, auth write
```sql
CREATE POLICY "Anyone can read" ON items FOR SELECT USING (true);
CREATE POLICY "Auth users insert" ON items FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
```

---

## Edge Functions

### Template Base
```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json();
    // ... logic

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
```

### Deploy & Logs
```bash
npx supabase functions deploy nome-funzione
npx supabase functions logs nome-funzione --tail
npx supabase secrets set API_KEY=xxx
```

---

## Query Comuni

### Upsert
```typescript
await supabase.from('items').upsert({ id, ...data }, { onConflict: 'id' });
```

### Select con join
```typescript
await supabase.from('items').select(`*, user:users(name, email)`);
```

### Pagination
```typescript
await supabase.from('items').select('*').range(0, 9).order('created_at', { ascending: false });
```

---

## Real-time

```typescript
const channel = supabase
  .channel('items-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'items' },
    (payload) => console.log('Change:', payload)
  )
  .subscribe();

// Cleanup
channel.unsubscribe();
```

---

## Errori Comuni

| Errore | Causa | Soluzione |
|--------|-------|-----------|
| "violates row-level security" | RLS blocca | Verifica policy o usa service_role |
| "violates foreign key" | Record parent mancante | Crea prima il parent |
| "Could not find function" | Non deployata | `npx supabase functions deploy` |

---

## CLI Utili

```bash
npx supabase status
npx supabase gen types typescript --local > src/types/supabase.ts
npx supabase db reset
npx supabase db diff
```
