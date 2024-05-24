export type matchingListHeaderProps = {
  text : string;
  background? : string;
  router? : string;
}

export type ExpandedButtonsProps = {
  heartState: string;
  router: string;
}

export type ItemContainerProps = {
  children?: React.ReactNode;
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
  singer: string;
  isDark?: boolean;
}

export type TagProps = {
  tag: string;
  isDark?: boolean;
}

export type SocialButtonProps = {
  onSelectedToggle : (selectedValue: string) => void;
  selected : string;
}