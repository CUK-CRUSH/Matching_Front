export type OnboardintState = {
  currentPage: 'kakaoId' | 'location';
  setCurrentPage: (page: OnboardintState['currentPage']) => void;
};
