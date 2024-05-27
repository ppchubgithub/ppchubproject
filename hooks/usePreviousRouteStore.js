import {create} from 'zustand';


export const usePreviousRouteStore = create((set) => ({
    prevPathname: null,
    setPrevPathname: (pathname) => set({ prevPathname: pathname }),
  }));