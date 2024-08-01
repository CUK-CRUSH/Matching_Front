/** Info 페이지 데이터 타입 */

type InfoDataDTO = {
  profileImageUrl: string;
  name: string;
  birthDate: string;
  gender: string;
  oneLineIntroduction: string;
};

export type UserInfoDTO = {
  profileImage?: string;
  name?: string | null;
  oneLineIntroduction?: string | null;
  isDeleteImage?: boolean;
};

export type ProfilesInfoDTO = {
  status: number;
  message: string;
  data: InfoDataDTO;
};

/** 메인 페이지 데이터 타입 */
type MainDataDTO = {
  profileImageUrl: string;
  name: string;
  birthDate: string;
  mbti: string;
  infoCount: number;
  introCount: number;
  musicTasteCount: number;
  unlockCount: number;
};

export type MainInfoDataDTO = {
  status: number;
  message: string;
  data: MainDataDTO;
};

/** Intro 페이지 데이터 타입 */
export type TagsState = 'FEATURED' | 'STANDARD' | 'NONE';

export type MusicTagDTO = {
  name: string;
  state: TagsState;
};

export type HobbyTagDTO = {
  name: string;
  state: TagsState;
};

export type UserIntroDTO = {
  mbti: string | null;
  musicTags: MusicTagDTO[];
  hobbyTags: HobbyTagDTO[];
  selfIntroduction: string | null;
  likeableMusicTaste: string | null;
};

export type UserTagsDTO = {
  musicTags: MusicTagDTO[];
  hobbyTags: HobbyTagDTO[];
};

/** MusicTag 데이터 타입 */
export type UserMusicTagDTO = {
  musicTags: MusicTagDTO[];
  hobbyTags: HobbyTagDTO[];
};
