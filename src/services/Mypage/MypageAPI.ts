import { api } from '../client';
import { Product } from '@/type/product';

export const getUserData = async () => {
  const { data } = await api.get<Product>('/v1/user');
  return data;
};
