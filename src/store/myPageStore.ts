import { MyPageState } from '@/type/store/MyPage/MypageState';
import { create } from 'zustand';

export const useMyPageStore = create<MyPageState>((set) => ({
  currentPage: 'mypage',

  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useMyPageStore;
