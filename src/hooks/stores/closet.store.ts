import { IClothesPreview, SortType } from '@src/types';
import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IClosetStore {
  sortType: SortType;
  setSortType: (data: SortType) => void;
  clothesList: IClothesPreview[];
  appendClothesList: (data: IClothesPreview[]) => void;
  resetClothesList: () => void;
  page: number;
  increasePage: () => void;
  resetPage: () => void;
  scrollState: {
    rowIndex: number;
    columnIndex: number;
  };
  setScrollState: (data: { rowIndex: number; columnIndex: number }) => void;
  resetScrollState: () => void;
  reset: () => void;
}

const initialState = {
  sortType: SortType.LATEST,
  clothesList: [],
  page: 1,
  scrollState: {
    rowIndex: 0,
    columnIndex: 0,
  },
};

const persistStore = create(
  persist<Readonly<IClosetStore>>(
    (set) => ({
      ...initialState,
      setSortType: (data) => {
        set((state) => ({ ...state, sortType: data }));
      },
      resetClothesList: () => {
        set((state) => ({ ...state, clothesList: [] }));
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
      reset: () => {
        set(() => initialState);
      },
    }),
    {
      name: 'cloz-closet-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export function useClosetStore() {
  const store = persistStore();
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  if (isHydrated === false) return { ...store, initialState };
  return store;
}
