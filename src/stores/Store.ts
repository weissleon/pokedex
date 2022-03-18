import create from "zustand";
import { produce } from "immer";

type StoreState = {
  currentIndex: number;
  isLoading: boolean;
  updateIndex: (index: number) => void;
  setIsLoading: (isLoading: boolean) => void;
};
export const useStore = create<StoreState>((set) => ({
  currentIndex: 0,
  isLoading: false,
  updateIndex: (index: number) => {
    set((state) =>
      produce(state, (draft) => {
        draft.currentIndex = index;
      })
    );
  },
  setIsLoading: (isLoading: boolean) => {
    set((state) =>
      produce(state, (draft) => {
        draft.isLoading = isLoading;
      })
    );
  },
}));
