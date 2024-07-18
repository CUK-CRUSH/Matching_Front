export type matchingListHeaderProps = {
  text?: string;
  background?: string;
  router?: string;
  mypageText?: string;
  onStateChange?: () => void;
  marginTop?: string;
}

export type ExpandedButtonsProps = {
  state: string;
  router: string;
}

export type ItemContainerProps = {
  children: React.ReactNode;
  ref: React.MutableRefObject<HTMLDivElement | null>;
}

export type ItemProps = {
  profileId?: number;
  name?: string;
  birthDate?: string;
  mbti?: string;
  oneLineIntroduction?: string;
  distance?: number;
  profileImageUrl? : string;
  lifeMusic?: {
    musicId: number;
    title: string;
    artist: string;
    url: string;
  };
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
  type? : string;
}

export type MusciCardProps = {
  musicId?: number,
  title?: string;
  artist?: string;
  url?: string,
  isDark?: boolean;
  isProilfeCard?: boolean;
}

export type TagProps = {
  name: string;
  state : string;
  isDark?: boolean;
  isProfileCard?: boolean;
  mark?: boolean;
  isSmall?: boolean;
}

export type SocialButtonProps = {
  onSelectedToggle: (selectedValue: string) => void;
  selected: string;
}

export type ClickedMessagePopUpProps = {
  handleClick: () => void;
  currentBackground?: string;
  name: string;
  birthDate: string;
  mbti: string;
  tag: string;
  time: string;
  isDark?: boolean;
}