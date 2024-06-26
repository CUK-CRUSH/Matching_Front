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
  name: string;
  age: string;
  mbti: string;
  time: string;
  tag: string[];
  music: Music[];
  couple: CoupleProps;
  introduce: string;
  likeMusic: string;
  isOpen : boolean;
  index? : number;

}

export type OpenProfileCardProps = {
  setOpen : (index: number | undefined, value: boolean) => void;
}

export type CombinedProfileCardProps = ProfileCardProps & OpenProfileCardProps;