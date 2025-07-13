import { create } from "zustand";

export const useCounter = create((set) => {
  return {
    counter: 10,
    incrCounter: () => set((state) => ({ counter: state.counter + 1 })),
    decrCounter: () => set((state) => ({ counter: state.counter - 1 })),
  };
});
