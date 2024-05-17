export type ExpandedButtonsProps = {
  heartState: string;
  router: string;
}

export type HeartContainerProps = {
  children?: React.ReactNode;
}

export type ReceivedHeartItemProps = {
  name: string;
  age: string;
  mbti: string;
  tag: string;
  time: string;
  song: string;
  singer: string;
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