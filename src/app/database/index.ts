import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

const database = createClient(supabaseUrl, supabaseAnonKey)
const handleInserts = (payload) => {
    console.log('Change received!', payload)
}
database
    .channel('todos')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'todos' }, handleInserts)
    .subscribe()
export default database