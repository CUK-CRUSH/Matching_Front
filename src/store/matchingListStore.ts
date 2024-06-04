import { MatchingListState } from '@/type/store/MatchingList/MatchingListState';
import { create } from 'zustand';

const useMatchingListStateStore = create<MatchingListState>((set) => ({
  matchingListState: 'heart',
  toggleMatchingListState: (state) => set({ matchingListState: state }),
}));

export default useMatchingListStateStore;