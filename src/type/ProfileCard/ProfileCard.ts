export type ProfileImageProps = {
    setLock: React.Dispatch<React.SetStateAction<boolean>>;
  };

export type SpreadProfileCardImageProps = {
    setLock: React.Dispatch<React.SetStateAction<boolean>>;
  };
  
export type UnlockModalProps = {
    setLock: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

export type IntroductionProps = {
  introduce: string;
}
export type LikeMusciProps = {
  likeMusic : string;
}

export type ProfileCardProps = {
  name: string;
  age: string;
  mbti: string;
  tag: string[];
  music: Music[];
  couple: CoupleProps;
  introduce: string;
  likeMusic: string;
}

