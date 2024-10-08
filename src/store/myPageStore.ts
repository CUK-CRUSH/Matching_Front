import { create } from 'zustand';
import { MyPageState } from '@/type/store/MyPage/MypageState';
import { LifeMusicItem } from '@/type/services/Music/MusicDTO';

export const useMyPageStore = create<MyPageState>((set) => ({
  currentPage: 'mypage',
  setCurrentPage: (page) => set({ currentPage: page }),

  selectedMBTI: { E_I: null, N_S: null, F_T: null, J_P: null },
  setSelectedMBTI: (mbti) => set({ selectedMBTI: mbti }),

  selectedMusicTag: [],
  setSelectedMusicTag: (tags) => set({ selectedMusicTag: tags }),

  selectedHobbyTag: [],
  setSelectedHobbyTag: (tags) => set({ selectedHobbyTag: tags }),

  textarea1: '',
  setTextarea1: (text) => set({ textarea1: text }),

  textarea2: '',
  setTextarea2: (text) => set({ textarea2: text }),

  selectedMusic: [],
  setSelectedMusic: (music) => set({ selectedMusic: music }),

  deleteLifeMusics: [],
  setDeleteLifeMusics: (musicIds) => set({ deleteLifeMusics: musicIds }),

  currentMusic: null,
  setCurrentMusic: (music: LifeMusicItem | null) => set({ currentMusic: music }),

  updateLifeMusics: [],
  setUpdateLifeMusics: (musics) => set({ updateLifeMusics: musics }),

  selectMusicMoodTitle: '',
  setSelectMusicMoodTitle: (title) => set({ selectMusicMoodTitle: title }),

  selectMusicMoodArtist: '',
  setSelectMusicMoodArtist: (artist) => set({ selectMusicMoodArtist: artist }),

  selectMusicMoodImage: null,
  setSelectMusicMoodImage: (image: string | null) => set({ selectMusicMoodImage: image }),
}));

export default useMyPageStore;
