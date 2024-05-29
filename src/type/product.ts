export type Tag = {
  music: string[];
  hobby: string[];
};

export type ProductData = {
  profileImage: string | null;
  kakaoId: string;
  sex: string;
  address: string;
  location_X: number;
  location_Y: number;
  nickname: string;
  birthDate: string;
  oneLiner: string;
  mbti?: string;
  tag?: Tag[];
  question?: string;
  answer?: string;
};

export type Product = {
  id?: string;
  data: ProductData;
};
