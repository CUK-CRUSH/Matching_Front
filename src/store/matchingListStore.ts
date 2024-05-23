import { MatchingListState } from '@/type/store/MatchingList/MatchingListState';
import { create } from 'zustand';

const useMatchingListStateStore = create<MatchingListState>((set) => ({
  matchingListState: 'heart',
  toggleMatchingListState: (type: 'heart' | 'message') => set({ matchingListState: type }),
}));

export default useMatchingListStateStore;