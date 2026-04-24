import { create } from 'zustand';
import { ComparisonResult } from '@/src/types/instagram';

type ListKey = 'notFollowingBack' | 'youDontFollowBack' | 'mutual';

type DataState = {
  currentResult: ComparisonResult | null;
  isProcessing: boolean;
  error: string | null;
  selectedList: ListKey;
  searchQuery: string;

  setResult: (result: ComparisonResult | null) => void;
  setProcessing: (isProcessing: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedList: (list: ListKey) => void;
  setSearchQuery: (query: string) => void;
  reset: () => void;
};

export const useDataStore = create<DataState>((set) => ({
  currentResult: null,
  isProcessing: false,
  error: null,
  selectedList: 'notFollowingBack',
  searchQuery: '',

  setResult: (result) => set({ currentResult: result, error: null }),
  setProcessing: (isProcessing) => set({ isProcessing }),
  setError: (error) => set({ error, isProcessing: false }),
  setSelectedList: (selectedList) => set({ selectedList, searchQuery: '' }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  reset: () =>
    set({
      currentResult: null,
      error: null,
      selectedList: 'notFollowingBack',
      searchQuery: '',
      isProcessing: false,
    }),
}));
