export type ProfileImageProps = {
  setOpen: (value: boolean) => void;
  setOpenModal : React.Dispatch<React.SetStateAction<boolean>>;
  isLock : boolean;
};

export type SpreadProfileCardImageProps = {
  setOpen: (value: boolean) => void;
  setOpenModal : React.Dispatch<React.SetStateAction<boolean>>;
  isLock : boolean;
};
export type FoldProfileCardImageProps = {
  setOpen: (value: boolean) => void;
};
export type UnlockModalProps = {
  setLock: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: (value: boolean) => void;
  setOpenModal:  React.Dispatch<React.SetStateAction<boolean>>;
  profileId : number;
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
  profileId: number;
  name: string;
  birthDate: string;
  mbti: string;
  oneLineIntroduction: string;
  distance: string;
  profileImageUrl : string;
  lifeMusics: {
    musicId: number;
    title: string;
    artist: string;
    url: string;
  }[];
  // 딛혀있을때
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
    moodImage : string;
    isDeleteImage : boolean;
  }[]
  selfIntroduction? : string;
  likeableMusicTaste? : string;
  

}

export type OpenProfileCardProps = {
  isOpen ? : boolean;
  setOpen : (index: number | undefined, value: boolean) => void;
}

export type CombinedProfileCardProps = ProfileCardProps & OpenProfileCardProps;