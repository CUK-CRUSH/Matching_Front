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
  lifeMusics: {
    musicId: number;
    title: string;
    artist: string;
    url: string;
  }[];
  tags: string[];

}

export type ProfileCardDTO = {
  status: number;
  message: string;
  data: ProfileCardProps[];
};