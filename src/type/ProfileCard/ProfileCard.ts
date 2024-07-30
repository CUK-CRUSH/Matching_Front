export type ProfileImageProps = {
  handleSetOpen?: (index: number | undefined, value: boolean) => void;
  handleSetModalOpen?: (index: number | undefined, value: boolean) => void;
  setIsUnfilledModalOpen?: (value : boolean) => void;
  setIsUnlockModalOpen? : React.Dispatch<React.SetStateAction<boolean>>;
  isLock? : boolean;
  activeIndex? : number;
  profileImageUrl? : string;
};

export type SpreadProfileCardImageProps = {
  handleSetOpen: (index: number | undefined, value: boolean) => void;
  handleSetModalOpen: (index: number | undefined, value: boolean) => void;
  setIsUnfilledModalOpen?: (value : boolean) => void;
  setIsUnlockModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isLock? : boolean;
  profileId? : number;

  activeIndex? : number;
};
export type FoldProfileCardImageProps = {
  handleSetOpen?: (index: number | undefined, value: boolean) => void;
  handleSetModalOpen?: (index: number | undefined, value: boolean) => void;
  activeIndex? : number;

};
export type UnlockModalProps = {
  setLock?: any
  handleSetOpen?: (index: number | undefined, value: boolean) => void;
  handleSetModalOpen?:  (index: number | undefined, value: boolean) => void;
  handleSetLockOpen?: (index: number | undefined, value: boolean) => void;
  setIsUnlockModalOpen? : React.Dispatch<React.SetStateAction<boolean>>;
  profileId? : number;
  isOpen? : boolean;
  isLock? : boolean;
  activeIndex? : number;
  currentBackground? : string;
};

export type UnFilledModalProps = {
  
  setIsUnfilledModalOpen:  (value: boolean) => void;
  profileId? : number;

  activeIndex? : number;
  currentBackground? : string;
};

export type YouTubeModalProps = {
  videoId?: string;
}
export type OneLineIntroductionProps = {
  oneLineIntroduction? : string;
}

export type DistanceProps = {
  distance? : number;
  isDark? : boolean;
}

export type ContainerProps = {
  children: React.ReactNode;
  isOpen?: boolean;
}

export type Music = {
  song: string;
  artist: string;
}

export type MoodProps = {
  title?: string;
  artist?: string;
  moodImageUrl? : string
  isDeleteImage? : boolean;
}

export type UserTasteProps = {
  title: string;
  value: string;
  testId: string;
}

export type ProfileCardProps = {
  profileId?: number;
  memberId?: number;
  name?: string;
  birthDate?: string;
  mbti?: string;
  oneLineIntroduction?: string;
  distance?: number;
  profileImageUrl? : string;
  lifeMusics?: {
    musicId: number;
    title: string;
    artist: string;
    videoId: string;
  }[];
  tags?: {
    name : string;
    state : string;
  }[];

  musicTags?: {
    name : string;
    state : string;
  }[];

  hobbyTags?: {
    name : string;
    state : string;
  }[];
  // 열린상태 

  mood? : {
    title : string;
    artist : string;
    moodImageUrl : string;
    isDeleteImage : boolean;
  }
  selfIntroduction? : string;
  likeableMusicTaste? : string;
  likeState? : boolean;
  isOpen? : boolean;
  isModalOpen? : boolean;
  isLock? : boolean;
  activeIndex? : number;
  currentBackground? :string;
  index? : number;

  // 코인여부
  coin? :boolean;
}

export type OpenProfileCardProps = {
  handleSetOpen? : (index: number | undefined, value: boolean) => void;
  handleSetModalOpen? : (index: number | undefined, value: boolean) => void;
  handleSetLockOpen? : (index: number | undefined, value: boolean) => void;
  setIsUnfilledModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUnlockModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;

  isUnlockModalOpen?: boolean;
}

export type CombinedProfileCardProps = ProfileCardProps & OpenProfileCardProps;

// 좋아요

export type SocialButtonsProps = {
  profileId? : number
  likeState? : boolean
}