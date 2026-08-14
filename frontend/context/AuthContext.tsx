'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { authApi } from '@/services/restaurantService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (credentials: { email: string; password?: string; role?: UserRole }) => Promise<User>;
  register: (userData: any) => Promise<User>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  hasRole: (allowedRoles: UserRole[]) => boolean;
}

const DEMO_USERS: Record<string, User> = {
  'admin@royalrestaurant.com': {
    id: 'usr-admin',
    name: 'Royal Admin',
    email: 'admin@royalrestaurant.com',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 000-1111',
  },
  'manager@royalrestaurant.com': {
    id: 'usr-manager',
    name: 'Sarah Connor',
    email: 'manager@royalrestaurant.com',
    role: 'Manager',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 000-2222',
  },
  'chef@royalrestaurant.com': {
    id: 'usr-chef',
    name: 'Master Chef Marco',
    email: 'chef@royalrestaurant.com',
    role: 'Chef',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 000-3333',
  },
  'waiter@royalrestaurant.com': {
    id: 'usr-waiter',
    name: 'Leo Vance',
    email: 'waiter@royalrestaurant.com',
    role: 'Waiter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 000-4444',
  },
  'cashier@royalrestaurant.com': {
    id: 'usr-cashier',
    name: 'Emma Watson',
    email: 'cashier@royalrestaurant.com',
    role: 'Cashier',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 000-5555',
  },
  'delivery@royalrestaurant.com': {
    id: 'usr-delivery',
    name: 'Ravi Kumar',
    email: 'delivery@royalrestaurant.com',
    role: 'Delivery',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 000-6666',
  },
  'customer@royalrestaurant.com': {
    id: 'usr-customer',
    name: 'Sophia Williams',
    email: 'customer@royalrestaurant.com',
    role: 'Customer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 000-7777',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage
    const savedToken = localStorage.getItem('royal_auth_token') || localStorage.getItem('giri_auth_token');
    const savedUser = localStorage.getItem('royal_auth_user') || localStorage.getItem('giri_auth_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing stored user:', e);
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: { email: string; password?: string; role?: UserRole }) => {
    const lowerEmail = credentials.email.toLowerCase();
    
    // Auto-detect role from email keyword if role is not explicitly passed
    let detectedRole: UserRole = credentials.role || 'Customer';
    if (!credentials.role) {
      if (lowerEmail.includes('admin')) detectedRole = 'Admin';
      else if (lowerEmail.includes('manager')) detectedRole = 'Manager';
      else if (lowerEmail.includes('chef')) detectedRole = 'Chef';
      else if (lowerEmail.includes('waiter')) detectedRole = 'Waiter';
      else if (lowerEmail.includes('cashier')) detectedRole = 'Cashier';
      else if (lowerEmail.includes('delivery')) detectedRole = 'Delivery Boy';
    }

    const demoUser = DEMO_USERS[lowerEmail] || Object.values(DEMO_USERS).find(u => u.role === detectedRole);

    try {
      const res = await Promise.race([
        authApi.login({ ...credentials, role: detectedRole }),
        new Promise<null>((_, reject) => setTimeout(() => reject(new Error('timeout')), 400))
      ]);
      if (res && res.user) {
        const loggedInUser: User = {
          id: res.user.id || res.user._id,
          name: res.user.name,
          email: res.user.email,
          role: res.user.role || detectedRole,
          phone: res.user.phone,
          avatar: res.user.avatar,
        };
        const authToken = res.token || 'demo-jwt-token';
        setUser(loggedInUser);
        setToken(authToken);
        localStorage.setItem('giri_auth_token', authToken);
        localStorage.setItem('giri_auth_user', JSON.stringify(loggedInUser));
        return loggedInUser;
      }
    } catch (err) {
      console.log('API login fallback to demo role user');
    }

    // Demo role fallback with auto-detected role
    const matchedUser: User = demoUser
      ? { ...demoUser, role: detectedRole }
      : {
          id: `usr-${Date.now()}`,
          name: credentials.email.split('@')[0].toUpperCase(),
          email: credentials.email,
          role: detectedRole,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        };

    const demoToken = `demo-token-${Date.now()}`;
    setUser(matchedUser);
    setToken(demoToken);
    localStorage.setItem('giri_auth_token', demoToken);
    localStorage.setItem('giri_auth_user', JSON.stringify(matchedUser));
    return matchedUser;
  };

  const switchRole = (newRole: UserRole) => {
    const targetDemo = Object.values(DEMO_USERS).find(u => u.role === newRole);
    const updatedUser: User = user
      ? { ...user, role: newRole }
      : (targetDemo || {
          id: `usr-${Date.now()}`,
          name: `${newRole} User`,
          email: `${newRole.toLowerCase().replace(/\s+/g, '')}@girirestaurant.com`,
          role: newRole,
        });

    const mockToken = `demo-token-${newRole.toLowerCase()}`;
    setUser(updatedUser);
    setToken(mockToken);
    localStorage.setItem('giri_auth_token', mockToken);
    localStorage.setItem('giri_auth_user', JSON.stringify(updatedUser));
  };

  const register = async (userData: any) => {
    try {
      const res = await authApi.register(userData);
      if (res && res.user) {
        const newUser: User = {
          id: res.user.id || res.user._id,
          name: res.user.name,
          email: res.user.email,
          role: res.user.role || userData.role || 'Customer',
          phone: res.user.phone,
          avatar: res.user.avatar,
        };
        const authToken = res.token || 'demo-jwt-token';
        setUser(newUser);
        setToken(authToken);
        localStorage.setItem('giri_auth_token', authToken);
        localStorage.setItem('giri_auth_user', JSON.stringify(newUser));
        return newUser;
      }
    } catch (err) {
      console.log('API register fallback');
    }

    const createdUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'Customer',
      phone: userData.phone,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    };

    const newTok = `demo-token-${Date.now()}`;
    setUser(createdUser);
    setToken(newTok);
    localStorage.setItem('royal_auth_token', newTok);
    localStorage.setItem('royal_auth_user', JSON.stringify(createdUser));
    return createdUser;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('royal_auth_token');
    localStorage.removeItem('royal_auth_user');
    localStorage.removeItem('royal_auth_token');
    localStorage.removeItem('royal_auth_user');
  };

  const hasRole = (allowedRoles: UserRole[]) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, switchRole, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
