import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, isFirebaseConfigured } from '../firebase/config';
import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(null);

const DEMO_USERS = {
  'superadmin@spartan28.com': {
    id: 'USR-001',
    name: 'Ron Brezzell',
    email: 'superadmin@spartan28.com',
    role: 'Super Admin',
    title: 'Head Coach & Founder',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop&q=80'
  },
  'admin@spartan28.com': {
    id: 'USR-002',
    name: 'Sarah Vance',
    email: 'admin@spartan28.com',
    role: 'Admin',
    title: 'Operations Director',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  'coach@spartan28.com': {
    id: 'USR-003',
    name: 'Marcus Vance',
    email: 'coach@spartan28.com',
    role: 'Coach',
    title: 'Strength & Hyrox Specialist',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
  },
  'content@spartan28.com': {
    id: 'USR-004',
    name: 'Elena Rostova',
    email: 'content@spartan28.com',
    role: 'Content Manager',
    title: 'Editorial & Recovery Lead',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('spartan28_auth_user');
    return saved ? JSON.parse(saved) : DEMO_USERS['superadmin@spartan28.com'];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          const matchedDemo = DEMO_USERS[firebaseUser.email] || {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Spartan Admin',
            email: firebaseUser.email,
            role: 'Admin',
            title: 'Staff Member',
            avatar: firebaseUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
          };
          setUser(matchedDemo);
          localStorage.setItem('spartan28_auth_user', JSON.stringify(matchedDemo));
        }
      });
      return () => unsubscribe();
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      if (isFirebaseConfigured && auth) {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const authedUser = DEMO_USERS[email] || {
          id: cred.user.uid,
          name: cred.user.displayName || email.split('@')[0],
          email: cred.user.email,
          role: 'Admin',
          title: 'Staff Member',
          avatar: cred.user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        };
        setUser(authedUser);
        localStorage.setItem('spartan28_auth_user', JSON.stringify(authedUser));
        return authedUser;
      } else {
        // High-speed Demo Auth
        const selected = DEMO_USERS[email] || {
          id: 'USR-CUSTOM',
          name: email.split('@')[0].toUpperCase(),
          email,
          role: 'Admin',
          title: 'Authorized Staff',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        };
        setUser(selected);
        localStorage.setItem('spartan28_auth_user', JSON.stringify(selected));
        return selected;
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await firebaseSignOut(auth);
      } catch (e) {
        console.error('Firebase sign out error:', e);
      }
    }
    setUser(null);
    localStorage.removeItem('spartan28_auth_user');
  };

  const switchRole = (roleKey) => {
    const target = Object.values(DEMO_USERS).find(u => u.role === roleKey || u.email.includes(roleKey.toLowerCase().replace(' ', '')));
    if (target) {
      setUser(target);
      localStorage.setItem('spartan28_auth_user', JSON.stringify(target));
    }
  };

  const value = {
    user,
    role: user?.role || 'Guest',
    isAuthenticated: Boolean(user),
    loading,
    login,
    logout,
    switchRole,
    demoAccounts: Object.values(DEMO_USERS)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
