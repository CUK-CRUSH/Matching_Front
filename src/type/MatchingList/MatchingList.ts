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
  name: string;
  age: string;
  mbti: string;
  tag: string;
  time: string;
  song: string;
  singer: string;
  type?: string;
}

export type MusciCardProps = {
  musicId?: number,
  title: string;
  artist: string;
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
}

export type SocialButtonProps = {
  onSelectedToggle: (selectedValue: string) => void;
  selected: string;
}

export type ClickedMessagePopUpProps = {
  handleClick: () => void;
  currentBackground?: string;
  name: string;
  age: string;
  mbti: string;
  tag: string;
  time: string;
  isDark?: boolean;
}