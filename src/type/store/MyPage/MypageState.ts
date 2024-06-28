export type MBTIState = {
  E_I: string | null;
  N_S: string | null;
  F_T: string | null;
  J_P: string | null;
};

type UserProfile = {
  name: string;
  oneLineIntroduction: string;
  profileImageUrl: string;
}

export type MyPageState = {
  currentPage: 'mypage' | 'info' | 'introduce' | 'music' | 'musicDetail' | 'tags' | 'location';
  setCurrentPage: (page: MyPageState['currentPage']) => void;

  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;

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
};
