import { create } from "zustand";

interface AuthModalState {
  isOpen: boolean;
  message: string;
  openModal: (message?: string) => void;
  closeModal: () => void;
}

export const useAuthModal = create<AuthModalState>((set) => ({
  isOpen: false,
  message: "Sign in to save your progress across devices.",
  openModal: (message) => set({ isOpen: true, message: message || "Sign in to save your progress across devices." }),
  closeModal: () => set({ isOpen: false }),
}));
