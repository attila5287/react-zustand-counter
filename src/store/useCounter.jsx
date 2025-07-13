import { create } from "zustand";
import axios from "axios";

export const useCounter = create((set, get) => {
  return {
    counter: 1,
    url: "https://rickandmortyapi.com/api/character/",
    apiData: null,
    
    fetchData: async (counter) => {
      try {
        const { data } = await axios.get(get().url + counter);
        console.log(data);
        set({
          apiData: data,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    
    loadInitialData: async () => {
      try {
        const { data } = await axios.get(get().url + get().counter);
        console.log(data);
        set({
          apiData: data,
        });
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    },
    
    incrCounter: async () => {
      if (get().counter < 827) {
        try {
          const newCounter = get().counter + 1;
          const { data } = await axios.get(get().url + newCounter);
          console.log(data);
          set({
            counter: newCounter,
            apiData: data,
          });
        } catch (error) {
          console.error("Error incrementing counter:", error);
        }
      } else {
        alert("You can't go above 826");
      }
    },
    
    decrCounter: async () => {
      if (get().counter > 1) {
        try {
          const newCounter = get().counter - 1;
          const { data } = await axios.get(get().url + newCounter);
          console.log(data);
          set({
            counter: newCounter,
            apiData: data,  
          });
        } catch (error) {
          console.error("Error decrementing counter:", error);
        }
      } else {
        alert("You can't go below 1");
      }
    },
  };
});
