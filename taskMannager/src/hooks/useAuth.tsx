import React, { createContext, useContext, useState, useEffect } from 'react';
import SupabaseService from '../SupabaseService';

type User = {
  id: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supaService = new SupabaseService();

  // Inicializar la sesión al cargar la app
  useEffect(() => {
    supaService.initializeSession();
    supaService.getCurrentUser().then(({ data }) => {
      setUser(data.user ? { id: data.user.id, email: data.user.email } : null);
      setIsLoading(false);
    });
  }, []);

  const login = async (email: string, password: string) => {
    const response = await supaService.signIn(email, password);
    if (response.user) {
      setUser({ id: response.user.id, email: response.user.email });
    }
  };

  const logout = async () => {
    await supaService.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
