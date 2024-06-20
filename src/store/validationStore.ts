import { OnboardintState } from '@/type/store/OnBoarding/OnBoardState';
import { create } from 'zustand';

export const useOnboardingStore = create<OnboardintState>((set) => ({
  currentPage: 'profileImage',
  userData: {
    phoneNumber: '',
    code: '',
    nickname: '',
    kakaoId: '',
    sex: '',
    birth: '',
    location: [0, 0],
    profileImage: '',
    comment: '',
  },
  userExist: false,
  setCurrentPage: (page) => set({ currentPage: page }),
  setUserData: (key, value) =>
    set((state) => ({
      userData: { ...state.userData, [key]: value },
    })),
  setUserExist: (exists) => set({ userExist: exists }),
}));

export default useOnboardingStore;
