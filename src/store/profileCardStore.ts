import { ProfileCardState } from '@/type/store/ProfileCardState/ProfileCardState';
import { create } from 'zustand';

const useProfileCardStore = create<ProfileCardState>((set) => ({
    // 코인소모
    coin: 12,
    setSpend2Coin: () => set((state) => ({ coin: state.coin - 2 })),

    // 메시지보내기 창 모달 오픈
    openMessage: false,
    setOpenMessage: () => set((state) => ({ openMessage: !state.openMessage })),

    ableSpend: false,
    setAbleSpend: () => set((state) => ({ ableSpend: !state.ableSpend })),

    index: undefined,
    setIndex: (newIndex: number | undefined) => set((state) => ({ ...state, index: newIndex })), // 상태 유지

    memberId: undefined,
    setMemberId: (newIndex: number | undefined) => set((state) => ({ ...state, memberId: newIndex })), // 상태 유지

    videoId: '', // 초기값을 빈 문자열로 설정
    setVideoId: (newIndex?: string) => set((state) => ({ ...state, videoId: newIndex })), // 상태 유지

    // 유튜브 모달창
    isYoutubeModalOpen : false,
    setIsYoutubeModalOpen: () => set((state) => ({ isYoutubeModalOpen: !state.isYoutubeModalOpen })),
    
}));

export default useProfileCardStore;
