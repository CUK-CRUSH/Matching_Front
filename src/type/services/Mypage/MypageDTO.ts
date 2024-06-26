type InfoDataDTO = {
  profileImageUrl: string;
  name: string;
  birthDate: string;
  gender: string;
  oneLineIntroduction: string;
};

type MainDataDTO = {
  profileImageUrl: string;
  name: string;
  birthDate: string;
  mbtiL: string;
  infoCount: number;
  introCount: number;
  musicCount: number;
};

export type ProfilesInfoDTO = {
  status: number;
  message: string;
  data: InfoDataDTO;
};

export type MainInfoDataDTO = {
  status: number;
  message: string;
  data: MainDataDTO;
};
