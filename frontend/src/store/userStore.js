import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null, // Rehydrate state from localStorage
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user)); // Save to localStorage
    set({ user });
  },
  logout: () => {
    localStorage.removeItem('user'); // Clear localStorage
    set({ user: null });
  },
}));

export default useUserStore;
