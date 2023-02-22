import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const persistStore = create(
  persist<{
    isPending: boolean;
    setIsPending: (data: boolean) => void;
  }>(
    (set) => {
      return {
        isPending: false,
        setIsPending: (data) => set((state) => ({ ...state, isPending: data })),
      };
    },
    {
      name: 'cloz-pending-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export function usePendingStore() {
  const store = persistStore();
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  if (isHydrated === false)
    return {
      ...store,
      isPending: false,
    };
  return store;
}
