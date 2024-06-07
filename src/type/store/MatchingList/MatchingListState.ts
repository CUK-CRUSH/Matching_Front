export interface MatchingListState {
  matchingListState: 'heart' | 'message';
  toggleMatchingListState: (type: 'heart' | 'message') => void;
}