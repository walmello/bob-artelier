import { createClient } from '@supabase/supabase-js'

const URL = "https://seqolypxaaqyrwzcwktp.supabase.co"
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcW9seXB4YWFxeXJ3emN3a3RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMTM0NDgsImV4cCI6MjA3NzU4OTQ0OH0.k4k6oql2nk_4MwmTrP9K-5hH0YlMRmSgiYg7UmU9cR4"

export default createClient(URL, ANON_KEY)
/*

export class SupabaseClient {
  constructor() {
    this.client = createClient(URL, ANON_KEY);
  }
  
  // ✅ leitura instantânea (sem async)
  getCachedUser() {
    const cached = localStorage.getItem("supabase_user");
    if (!cached) return null;
    try {
      return JSON.parse(cached);
    } catch {
      localStorage.removeItem("supabase_user");
      return null;
    }
  }
  
  // 🔄 atualização silenciosa (background)
  async refreshSession() {
    const { data } = await this.client.auth.getSession();
    const user = data.session?.user || null;
    if (user) localStorage.setItem("supabase_user", JSON.stringify(user));
    return user;
  }
  
  // 🚀 método unificado
  async getSession() {
    const cachedUser = this.getCachedUser();
    // se tem cache, já retorna e atualiza depois
    if (cachedUser) {
      this.refreshSession();
      return cachedUser;
    }
    // senão, busca do supabase
    return await this.refreshSession();
  }
  
  async login(email, password) {
    // limpa qualquer cache antigo antes de tentar logar
    localStorage.removeItem("supabase_user");
    
    const { data, error } = await this.client.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error("❌ Erro ao fazer login:", error.message);
      return null;
    }
    
    const user = data.user;
    if (user) {
      localStorage.setItem("supabase_user", JSON.stringify(user));
      console.log("✅ Login bem-sucedido:", user.email);
      window.location.href = "dashboard.html";
    }
    
    return user;
  }
  
  async logout() {
    try {
      await this.client.auth.signOut({ scope: "global" });
    } catch (e) {
      console.warn("⚠️ Erro ao encerrar sessão Supabase:", e.message);
    }
    
    localStorage.removeItem("supabase_user");
    console.log("🚪 Logout concluído. Limpando cache e redirecionando...");
    window.location.href = "login.html";
  }
  
  async getUser(redirectUrl = "login.html") {
    const user = this.getCachedUser();
    if (user) return user;
    
    // fallback — só se o cache estiver vazio
    const fresh = await this.refreshSession();
    if (!fresh) {
      console.log("❌ Nenhum usuário logado. Redirecionando...");
      window.location.href = redirectUrl;
      return null;
    }
    
    return fresh;
  }
}

export const client = new SupabaseClient();

*/