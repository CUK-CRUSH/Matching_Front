export type ProfileImageProps = {
  handleSetOpen: (index: number | undefined, value: boolean) => void;
  handleSetModalOpen: (index: number | undefined, value: boolean) => void;
  isLock? : boolean;
  activeIndex? : number;
  profileImageUrl? : string;
};

export type SpreadProfileCardImageProps = {
  handleSetOpen: (index: number | undefined, value: boolean) => void;
  handleSetModalOpen: (index: number | undefined, value: boolean) => void;
  isLock? : boolean;
  profileId? : number;

  activeIndex? : number;
};
export type FoldProfileCardImageProps = {
  handleSetOpen: (index: number | undefined, value: boolean) => void;
  handleSetModalOpen: (index: number | undefined, value: boolean) => void;
  activeIndex? : number;

};
export type UnlockModalProps = {
  setLock?: React.Dispatch<React.SetStateAction<boolean>>;
  handleSetOpen: (index: number | undefined, value: boolean) => void;
  handleSetModalOpen:  (index: number | undefined, value: boolean) => void;
  handleSetLockOpen: (index: number | undefined, value: boolean) => void;
  profileId? : number;
  isOpen? : boolean;
  isLock? : boolean;
  activeIndex? : number;
  currentBackground : string;
};

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
    url: string;
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
  isOpen? : boolean;
  isModalOpen? : boolean;
  isLock? : boolean;
  activeIndex? : number;
  currentBackground? :string;

  // 코인여부
  coin? :boolean;
}

export type OpenProfileCardProps = {
  handleSetOpen? : (index: number | undefined, value: boolean) => void;
  handleSetModalOpen? : (index: number | undefined, value: boolean) => void;
  handleSetLockOpen? : (index: number | undefined, value: boolean) => void;
}

export type CombinedProfileCardProps = ProfileCardProps & OpenProfileCardProps;