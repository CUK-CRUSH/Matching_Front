
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
export type ItemPropsDTO = {
    status: number;
    message: string;
    data: ItemProps[]
  }

export type MessageItemProps = {
    content?: string;
    messageDate?: string;
    receiver?: ItemProps;
    sender?: ItemProps;
    senderId?: number;
    senderName?: string;
  }
  export type SendedMessageItemPropsDTO = {
    status: number;
    message: string;
    data: MessageItemProps[]
  }