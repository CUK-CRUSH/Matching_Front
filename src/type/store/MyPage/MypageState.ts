export type MyPageState = {
  currentPage: 'mypage' | 'info' | 'introduce' | 'music' | 'tags';

  setCurrentPage: (page: MyPageState['currentPage']) => void;
};
