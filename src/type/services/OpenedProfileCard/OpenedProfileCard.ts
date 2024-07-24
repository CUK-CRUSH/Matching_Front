
// 목록조회 DTO
export type OpenedProfileCardProps = {
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
    liketime:string;
  }
  
  export type OpenedProfileCardDTO = {
    status: number;
    message: string;
    data: OpenedProfileCardProps[];
  }