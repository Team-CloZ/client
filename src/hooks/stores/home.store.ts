import { IClothesPreview, SortType } from '@src/types';
import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IHomeStore {
  sortType: SortType;
  setSortType: (data: SortType) => void;
  clothesList: IClothesPreview[];
  appendClothesList: (data: IClothesPreview[]) => void;
  resetClothesList: () => void;
  keyword: string;
  setKeyword: (data: string) => void;
  page: number;
  increasePage: () => void;
  resetPage: () => void;
  scrollState: {
    rowIndex: number;
    columnIndex: number;
  };
  setScrollState: (data: { rowIndex: number; columnIndex: number }) => void;
  resetScrollState: () => void;
  isSearching: boolean;
  setIsSearching: (data: boolean) => void;
  reset: () => void;
}

const initialState = {
  sortType: SortType.LATEST,
  clothesList: [],
  keyword: '',
  page: 1,
  isSearching: false,
  scrollState: {
    rowIndex: 0,
    columnIndex: 0,
  },
};

const persistStore = create(
  persist<Readonly<IHomeStore>>(
    (set) => ({
      ...initialState,
      setSortType: (data) => {
        set((state) => ({ ...state, sortType: data }));
      },
      resetClothesList: () => {
        set((state) => ({ ...state, clothesList: [] }));
      },
      setKeyword: (data) => {
        set((state) => ({ ...state, keyword: data }));
      },
      resetPage: () => {
        set((state) => ({ ...state, page: initialState.page }));
      },
      appendClothesList: (data) => {
        set((state) => ({
          ...state,
          clothesList: state.clothesList.concat(
            data.filter(
              (item) =>
                state.clothesList.findIndex((i) => i.id === item.id) === -1
            )
          ),
        }));
      },
      increasePage: () => {
        set((state) => ({ ...state, page: state.page + 1 }));
      },
      setScrollState: (data) => {
        set((state) => ({ ...state, scrollState: data }));
      },
      resetScrollState: () => {
        set((state) => ({
          ...state,
          scrollState: initialState.scrollState,
        }));
      },
      setIsSearching: (data) => {
        set((state) => ({ ...state, isSearching: data }));
      },
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'cloz-home-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export function useHomeStore() {
  const store = persistStore();
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  if (isHydrated === false) return { ...store, initialState };
  return store;
}
