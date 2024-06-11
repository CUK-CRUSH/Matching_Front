import { OnboardintState } from '@/type/store/OnBoarding/OnBoardState';
import { create } from 'zustand';

export const useOnboardingStore = create<OnboardintState>((set) => ({
  currentPage: 'profileImage',
  userData: {
    profileImage: null,
    kakaoId: '',
    sex: '',
    address: '',
    location_X: 0,
    location_Y: 0,
    nickname: '',
    birthDate: null,
    oneLiner: '',
  },
  setCurrentPage: (page) => set({ currentPage: page }),
  setUserData: (key, value) =>
    set((state) => ({
      userData: { ...state.userData, [key]: value },
    })),
}));

export default useOnboardingStore;
