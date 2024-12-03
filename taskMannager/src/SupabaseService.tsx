import { createClient } from '@supabase/supabase-js';

class SupabaseService {
  private static instance: SupabaseService;
  private supabaseUrl = 'https://auvepfnxyrreslcbmboc.supabase.co'; // Cambia por tu URL
  private supabaseKey = ''; // Cambia por tu clave
  public supabase = createClient(this.supabaseUrl, this.supabaseKey);

  private constructor() {}

  public static getInstance(): SupabaseService {
    if (!SupabaseService.instance) {
      SupabaseService.instance = new SupabaseService();
    }
    return SupabaseService.instance;
  }

  initializeSession() {
    const session = localStorage.getItem('supabase-session');
    if (session) {
      const parsedSession = JSON.parse(session);
      this.supabase.auth.setSession(parsedSession);
    }
  }

  getCurrentUser() {
    return this.supabase.auth.getUser();
  }
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  
    return data;
  }
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
  
    if (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  
    // Limpiar la sesión almacenada en localStorage
    localStorage.removeItem('supabase-session');
  }
  
  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });
  
    if (error) {
      console.error('Error al registrarte:', error);
      throw error;
    }
  
    return data;
  }
  
}

export default SupabaseService;
