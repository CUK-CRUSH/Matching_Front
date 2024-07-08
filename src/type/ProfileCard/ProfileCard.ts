export type ProfileImageProps = {
  handleSetOpen: (index: number | undefined, value: boolean) => void;
  handleSetModalOpen: (index: number | undefined, value: boolean) => void;
  isLock? : boolean;
  activeIndex? : number;
};

export type SpreadProfileCardImageProps = {
  handleSetOpen: (index: number | undefined, value: boolean) => void;
  handleSetModalOpen: (index: number | undefined, value: boolean) => void;
  isLock? : boolean;
  activeIndex? : number;
};
export type FoldProfileCardImageProps = {
  handleSetOpen: (index: number | undefined, value: boolean) => void;
  activeIndex? : number;

};
export type UnlockModalProps = {
  setLock?: React.Dispatch<React.SetStateAction<boolean>>;
  handleSetOpen: (index: number | undefined, value: boolean) => void;
  handleSetModalOpen:  (index: number | undefined, value: boolean) => void;
  profileId? : number;
  isOpen : boolean | undefined;
  activeIndex? : number;
  currentBackground : string;
};

export type ContainerProps = {
  children: React.ReactNode;
}

export type Music = {
  song: string;
  artist: string;
}

export type CoupleProps = {
  song: string;
  artist: string;
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
  distance?: string;
  profileImageUrl? : string;
  lifeMusics?: {
    musicId: number;
    title: string;
    artist: string;
    url: string;
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
    moodImage : string;
    isDeleteImage : boolean;
  }[]
  selfIntroduction? : string;
  likeableMusicTaste? : string;
  isOpen? : boolean;
  isModalOpen? : boolean;
  isLock? : boolean;
  activeIndex? : number;
  currentBackground? :string;
}

export type OpenProfileCardProps = {
  handleSetOpen? : (index: number | undefined, value: boolean) => void;
  handleSetModalOpen? : (index: number | undefined, value: boolean) => void;
}

export type CombinedProfileCardProps = ProfileCardProps & OpenProfileCardProps;