import { OnboardintState } from '@/type/store/OnBoarding/OnBoardState';
import { create } from 'zustand';

export const useOnboardingStore = create<OnboardintState>((set) => ({
  currentPage: 'profileImage',
  userData: {
    phoneNumber: '',
    verificationCode: '',
    name: '',
    kakaoId: '',
    gender: '',
    birthDate: '',
    location: [0, 0],
    profileImage: '',
    oneLineIntroduction: '',
  },
  userExist: false,
  isSubmitted: false,
  setCurrentPage: (page) => set({ currentPage: page }),
  setUserData: (key, value) =>
    set((state) => ({
      userData: { ...state.userData, [key]: value },
    })),
  setUserExist: (exists) => set({ userExist: exists }),
  setIsSubmitted: (sub) => set({ isSubmitted: sub }),
}));

export default useOnboardingStore;
