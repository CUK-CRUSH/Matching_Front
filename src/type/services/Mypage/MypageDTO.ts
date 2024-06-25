type InfoDataDTO = {
  profileImageUrl: string;
  name: string;
  birthDate: string;
  gender: string;
  oneLineIntroduction: string;
};

export type ProfilesInfoDTO = {
  status: number;
  message: string;
  data: InfoDataDTO;
};
