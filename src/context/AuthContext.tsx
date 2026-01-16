import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (emailOrUsername: string, password: string) => Promise<void>;
  signUp: (emailOrUsername: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mapUser = (sessionUser: SupabaseUser | null): User | null => {
  if (!sessionUser) return null;
  return {
    id: sessionUser.id,
    email: sessionUser.email || "",
    name: (sessionUser.user_metadata?.name as string) || sessionUser.email || "User",
    avatar: (sessionUser.user_metadata?.avatar_url as string) || undefined,
  };
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    const init = async () => {
      setIsLoading(true);
      const { data } = await supabase.auth.getSession();
      setUser(mapUser(data.session?.user ?? null));
      setIsLoading(false);
    };
    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(mapUser(session?.user ?? null));
      setIsLoading(false);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (emailOrUsername: string, password: string) => {
    if (!supabase) {
      throw new Error("Supabase is not configured. Please check your environment variables.");
    }
    setIsLoading(true);
    // Supabase uses email for authentication, so we treat username as email
    const { data, error } = await supabase.auth.signInWithPassword({ email: emailOrUsername, password });
    if (error) {
      setIsLoading(false);
      throw error;
    }
    setUser(mapUser(data.user));
    setIsLoading(false);
  };

  const signUp = async (emailOrUsername: string, password: string, name?: string) => {
    if (!supabase) {
      throw new Error("Supabase is not configured. Please check your environment variables.");
    }
    setIsLoading(true);
    // Supabase uses email for authentication, so we treat username as email
    const { data, error } = await supabase.auth.signUp({
      email: emailOrUsername,
      password,
      options: { data: { name } },
    });
    if (error) {
      setIsLoading(false);
      throw error;
    }
    setUser(mapUser(data.user ?? data.session?.user ?? null));
    setIsLoading(false);
  };

  const logout = async () => {
    if (!supabase) {
      setUser(null);
      return;
    }
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signUp, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

