export type OnboardintState = {
  currentPage: 'kakaoId' | 'sex' | 'location';
  setCurrentPage: (page: OnboardintState['currentPage']) => void;
};
