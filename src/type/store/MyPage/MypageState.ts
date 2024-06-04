export type MyPageState = {
  currentPage: 'mypage' | 'info' | 'introduce' | 'music';

  setCurrentPage: (page: MyPageState['currentPage']) => void;
};
