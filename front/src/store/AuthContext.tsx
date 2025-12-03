import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export type UserRole = 'ADMIN' | 'CUSTOMER';

interface User {
  id?: number;
  username: string;
  email: string;
  full_name?: string;
  role: UserRole; // ADMIN | CUSTOMER
}

interface AuthContextType {
  user: User | null;
  login: (userData: any) => void;  // nhận object từ backend
  logout: () => void;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user từ localStorage khi reload web
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  // LOGIN nhận object từ backend → chuẩn hóa role
  const login = (userData: any) => {
    const roleFixed: UserRole = userData.role.toUpperCase() as UserRole;

    const newUser: User = {
      id: userData.id,
      username: userData.username,
      full_name: userData.full_name,
      email: userData.email,
      role: roleFixed,
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user,
        login,
        logout,
        isAuthenticated: !!user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
