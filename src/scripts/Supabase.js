import { createClient } from '@supabase/supabase-js'

const URL = "https://seqolypxaaqyrwzcwktp.supabase.co"
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcW9seXB4YWFxeXJ3emN3a3RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMTM0NDgsImV4cCI6MjA3NzU4OTQ0OH0.k4k6oql2nk_4MwmTrP9K-5hH0YlMRmSgiYg7UmU9cR4"

const supabase = createClient(URL, ANON_KEY)

export const login = async (email, password) => {
    if(!email) throw new Error("Digite um email")
    if(!password) throw new Error("Digite a senha")
    const {data, error} = await supabase.auth.signInWithPassword({ email, password})
    if(error) throw new Error(error.message)
    localStorage.setItem('user', JSON.stringify(data.user))
    window.location.href = '/dashboard'
    //return data.user
}

export const register = async (email, password) => {
    if(!email) throw new Error("Digite um email")
    if(!password) throw new Error("Digite a senha")
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: "https://bobartelier.netlify.app/login"
        }
    });
    const invalid = !data.session
    if(invalid) throw new Error("Email já existe")
    if(error) throw new Error(error.message)
    else return data.user
}

export const getUser = async () => {
    const savedUser = localStorage.getItem('user')
    if(!savedUser){
        const { data: { user }, error } = await supabase.auth.getUser()
        if(error) throw new Error(error.message)
        localStorage.setItem('user', JSON.stringify(user))
        console.log('fetching user')
        return user
    } else {
        console.log('saved user')
        return savedUser
    }
}

export const logoff = async (params) => {
    const { error } = await supabase.auth.signOut()
    if(error) throw new Error(error.message)
}