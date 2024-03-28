import { api } from './client';
import type { PersonalInfo } from '@/type/personalInfo';
import type { Product } from '@/type/product';

const PERSON_INFO_URL = '/personalInfo';

export const personalInfoAPI = async (personalInfo: PersonalInfo) => {
  const { data } = await api.post<Product, PersonalInfo>(PERSON_INFO_URL, personalInfo);
  return data;
};
