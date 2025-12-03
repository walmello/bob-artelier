import { createClient } from '@supabase/supabase-js'

console.log('script chamado. isso deve aparecer apenas 1 vez!')

const URL = "https://seqolypxaaqyrwzcwktp.supabase.co"
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcW9seXB4YWFxeXJ3emN3a3RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMTM0NDgsImV4cCI6MjA3NzU4OTQ0OH0.k4k6oql2nk_4MwmTrP9K-5hH0YlMRmSgiYg7UmU9cR4"

const supabase = createClient(URL, ANON_KEY)

export const login = async (email, password) => {
    if(!email) throw new Error("Digite um email")
    if(!password) throw new Error("Digite a senha")
    const {data, error} = await supabase.auth.signInWithPassword({ email, password})
    if(error) throw new Error(error.message)
    else return data.user
}

export const register = async (email, password) => {
    if(!email) throw new Error("Digite um email")
    if(!password) throw new Error("Digite a senha")
    const {data, error} = await supabase.auth.signUp({ email, password})
    const invalid = !data.session
    if(invalid) throw new Error("Email já existe")
    if(error) throw new Error(error.message)
    else return data.user
}
