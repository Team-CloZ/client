import { isKoApi } from '@src/apis/papago.api';
import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IGenerateStore {
  title: string;
  color: string;
  desc: string;
  tlTitle: string;
  tlColor: string;
  tlDesc: string;
  imageUrl: string;
  selectImageUrls: string[];
  parentId?: number;
  setTitle: (data: string) => void;
  setColor: (data: string) => void;
  setDesc: (data: string) => void;
  setTlTitle: (data: string) => void;
  setTlColor: (data: string) => void;
  setTlDesc: (data: string) => void;
  setImageUrl: (data?: string) => void;
  setSelectImageUrls: (data: string[]) => void;
  setParentId: (data: number) => void;
  reset: () => void;
}

const initialState = {
  title: '',
  color: '',
  desc: '',
  tlTitle: '',
  tlColor: '',
  tlDesc: '',
  imageUrl: '',
  selectImageUrls: [],
  parentId: undefined,
};

const persistStore = create(
  persist<IGenerateStore>(
    (set) => ({
      ...initialState,
      setTitle: (data) => {
        set((state) => ({ ...state, title: data }));
      },
      setColor: (data) => {
        set((state) => ({ ...state, color: data }));
      },
      setDesc: (data) => {
        set((state) => ({ ...state, desc: data }));
      },
      setTlTitle: (data) => {
        set((state) => ({ ...state, tlTitle: data }));
      },
      setTlColor: (data) => {
        set((state) => ({ ...state, tlColor: data }));
      },
      setTlDesc: (data) => {
        set((state) => ({ ...state, tlDesc: data }));
      },
      setImageUrl: (data) => {
        set((state) => ({ ...state, imageUrl: data }));
      },
      setSelectImageUrls: (data) => {
        set((state) => ({ ...state, selectImageUrls: data }));
      },
      setParentId: (data) => {
        set((state) => ({ ...state, parentId: data }));
      },
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'cloz-generate-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export function useGenerateStore() {
  const store = persistStore();
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  if (isHydrated === false) return { ...store, initialState };
  return store;
}
