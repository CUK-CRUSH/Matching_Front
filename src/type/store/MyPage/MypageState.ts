import { LifeMusicItem } from '@/type/services/Music/MusicDTO';

export type MBTIState = {
  E_I: string | null;
  N_S: string | null;
  F_T: string | null;
  J_P: string | null;
};

export type MyPageState = {
  currentPage:
    | 'mypage'
    | 'info'
    | 'introduce'
    | 'music'
    | 'musicDetail'
    | 'tags'
    | 'location'
    | 'mood';
  setCurrentPage: (page: MyPageState['currentPage']) => void;

  selectedMBTI: MBTIState;
  setSelectedMBTI: (mbti: MBTIState) => void;

  selectedMusicTag: string[];
  setSelectedMusicTag: (tags: string[]) => void;

  selectedHobbyTag: string[];
  setSelectedHobbyTag: (tags: string[]) => void;

  textarea1: string;
  setTextarea1: (text: string) => void;

  textarea2: string;
  setTextarea2: (text: string) => void;

  selectedMusic: LifeMusicItem[];
  setSelectedMusic: (music: LifeMusicItem[]) => void;

  deleteLifeMusics: number[];
  setDeleteLifeMusics: (musicIds: number[]) => void;

  updateLifeMusics: LifeMusicItem[];
  setUpdateLifeMusics: (musics: LifeMusicItem[]) => void;

  selectMusicMoodTitle: string;
  setSelectMusicMoodTitle: (title: string) => void;

  selectMusicMoodArtist: string;
  setSelectMusicMoodArtist: (artist: string) => void;

  selectMusicMoodImage: string | null;
  setSelectMusicMoodImage: (image: string | null) => void;
};
