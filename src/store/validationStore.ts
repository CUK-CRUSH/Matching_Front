import { OnboardintState } from '@/type/store/OnBoarding/OnBoardState';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useOnboardingStore = create(
  persist<OnboardintState>(
    (set) => ({
      currentPage: 'kakaoId',
      setCurrentPage: (page) => set({ currentPage: page }),
    }),
    {
      name: 'onboarding-store',
    },
  ),
);

export default useOnboardingStore;
