import { ProfileCardState } from '@/type/store/ProfileCardState/ProfileCardState';
import { create } from 'zustand';

const useProfileCardStore = create<ProfileCardState>(

  (set) => ({
    coin: 12,
    setSpend2Coin: () => set((state: { coin: number; }) => ({ coin: state.coin - 2 })),
  }),
);

export default useProfileCardStore;
