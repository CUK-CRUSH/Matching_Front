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

// 목록조회 DTO
export type ProfileCardSummaryProps = {
  profileId: number;
  name: string;
  birthDate: string;
  mbti: string;
  oneLineIntroduction: string;
  distance: number;
  profileImageUrl : string;
  lifeMusics: {
    musicId: number;
    title: string;
    artist: string;
    url: string;
  }[];
  // 딛혀있을때
  tags: {
    name : string;
    state : string;
  }[];
}

type DataSummaryType = {
  profileCardSummaryResponses : ProfileCardSummaryProps[];
  isProfileComplete? : boolean;
  coin : number;
}

export type ProfileCardSummaryDTO = {
  status: number;
  message: string;
  data: DataSummaryType
}

// 단일 조회 DTO
export type ProfileCardProps = {
  profileId?: number;
  name?: string;
  birthDate?: string;
  mbti?: string;
  oneLineIntroduction?: string;
  distance?: number;
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
    moodImageUrl : string;
    isDeleteImage : boolean;
  }
  selfIntroduction? : string;
  likeableMusicTaste? : string;
  likeState? : boolean;

}
type DataType = {
  profileCardResponse : ProfileCardProps;
  coin : number;
}

// 단일조회 dto
export type ProfileCardDTO = {
  status: number;
  message: string;
  data: DataType
  
};