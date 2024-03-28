export type Disease = 'BRAIN' | 'HEART' | 'CANCER' | 'BORNFIRE' | 'TEETH' | 'DEMENTIA' | 'NONE';

export type Gender = 'MALE' | 'FEMALE';

export type ProductType = 'LIFE' | 'DISEASE';

export type PersonalInfo = {
  gender: Gender;
  birth: string;
  disease: Disease[];
  analyze: string;
  productType: ProductType;
};
