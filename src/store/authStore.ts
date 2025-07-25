import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

interface AuthStore {
  currentUser: User | null;
  users: User[];
  isAuthenticated: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ success: boolean; message: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signOut: () => void;
  deleteAccount: () => void;
  getUser: (email: string) => User | undefined;
}

// Store user credentials separately for security
const getStoredCredentials = (): Record<string, string> => {
  const stored = localStorage.getItem('user-credentials');
  return stored ? JSON.parse(stored) : {};
};

const setStoredCredentials = (credentials: Record<string, string>) => {
  localStorage.setItem('user-credentials', JSON.stringify(credentials));
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [],
      isAuthenticated: false,

      signUp: async (email: string, password: string, firstName: string, lastName: string) => {
        const { users } = get();
        
        // Check if user already exists
        if (users.find(user => user.email === email)) {
          return { success: false, message: 'User already exists with this email' };
        }

        // Create new user
        const newUser: User = {
          id: Date.now().toString(),
          email,
          firstName,
          lastName,
          createdAt: new Date().toISOString()
        };

        // Store credentials separately
        const credentials = getStoredCredentials();
        credentials[email] = password;
        setStoredCredentials(credentials);

        // Update users list
        set(state => ({
          users: [...state.users, newUser],
          currentUser: newUser,
          isAuthenticated: true
        }));

        return { success: true, message: 'Account created successfully!' };
      },

      signIn: async (email: string, password: string) => {
        const { users } = get();
        const credentials = getStoredCredentials();
        
        // Check if user exists
        const user = users.find(u => u.email === email);
        if (!user) {
          return { success: false, message: 'User not found. Please create an account first.' };
        }

        // Validate password
        if (credentials[email] !== password) {
          return { success: false, message: 'Invalid password. Please try again.' };
        }

        // Sign in user
        set({
          currentUser: user,
          isAuthenticated: true
        });

        return { success: true, message: 'Welcome back!' };
      },

      signOut: () => {
        set({
          currentUser: null,
          isAuthenticated: false
        });
      },

      deleteAccount: () => {
        const { currentUser, users } = get();
        if (!currentUser) return;

        // Remove user credentials
        const credentials = getStoredCredentials();
        delete credentials[currentUser.email];
        setStoredCredentials(credentials);

        // Remove user data
        localStorage.removeItem(`user-data-${currentUser.id}`);

        // Update users list
        set({
          users: users.filter(user => user.id !== currentUser.id),
          currentUser: null,
          isAuthenticated: false
        });
      },

      getUser: (email: string) => {
        return get().users.find(user => user.email === email);
      }
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ 
        users: state.users, 
        currentUser: state.currentUser, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);