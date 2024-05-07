import { OnboardintState } from '@/type/store/OnBoarding/OnBoardState';
import { create } from 'zustand';

export const useOnboardingStore = create<OnboardintState>((set) => ({
  currentPage: 'kakaoId',
  userData: {
    kakaoId: '',
    sex: '',
    address: '',
    location_X: 0,
    location_Y: 0,
    nickname: '',
    birthDate: null,
  },
  setCurrentPage: (page) => set({ currentPage: page }),
  setUserData: (key, value) =>
    set((state) => ({
      userData: { ...state.userData, [key]: value },
    })),
}));

export default useOnboardingStore;
