export type matchingListHeaderProps = {
  text : string;
  background? : string;
  router? : string;
  mypageText? : string;
  onStateChange? : () => void;
  marginTop? : string;
}

export type ExpandedButtonsProps = {
  state: string;
  router: string;
}

export type ItemContainerProps = {
  children: React.ReactNode;
}

export type ItemProps = {
  name: string;
  age: string;
  mbti: string;
  tag: string;
  time: string;
  song: string;
  singer: string;
  type? :string;
}

export type MusciCardProps = {
  song: string;
  artist: string;
  isDark?: boolean;
  isProilfeCard? : boolean;
}

export type TagProps = {
  tag: string;
  isDark?: boolean;
  isProfileCard? : boolean;

}

export type SocialButtonProps = {
  onSelectedToggle : (selectedValue: string) => void;
  selected : string;
}

export type ClickedMessagePopUpProps = { 
  isClicked : boolean;
  handleClick : () => void;
  currentBackground : string;
  name: string;
  age: string;
  mbti: string;
  tag: string;
  time: string;
}