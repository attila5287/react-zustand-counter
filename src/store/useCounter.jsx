import { create } from "zustand";
import axios from "axios";

export const useCounter = create((set, get) => {
  return {
    counter: 1,
    incrCounter: async () => {
      const { data } = await axios.get(
        "https://randomuser.me/api/?results=" + (get().counter + 1)
      );
      console.log(data);
      console.log(data.results.length + 1);
      set({
        counter: data.results.length,
      });
    },
  };
});
