import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useLatexStore = create(
  persist(
    (set) => ({
      latexOutput: '',
      setLatexOutput: (latex) => set({ latexOutput: latex }),
    }),
    {
      name: 'latex-storage', // unique name for localStorage
    }
  )
);

export default useLatexStore;
