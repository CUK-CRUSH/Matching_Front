import { OnboardintState } from '@/type/store/OnBoarding/OnBoardState';
import { create } from 'zustand';

export const useOnboardingStore = create<OnboardintState>((set) => ({
  currentPage: 'profileImage',
  userData: {
    phoneNumber: '',
    code: '',
    profileImage: null,
    kakaoId: '',
    sex: '',
    address: '',
    location: [0, 0],
    nickname: '',
    birth: null,
    comment: '',
  },
  setCurrentPage: (page) => set({ currentPage: page }),
  setUserData: (key, value) =>
    set((state) => ({
      userData: { ...state.userData, [key]: value },
    })),
}));

export default useOnboardingStore;
