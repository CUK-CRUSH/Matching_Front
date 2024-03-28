import type { Product } from '@/type/product';

export const MOCK_PRODUCT: Product = {
  productName: '한화 암보험',
  coveredList: [
    {
      coveredName: '암진단',
      diseaseName: '일반암',
      coveredPrice: '1000',
    },
  ],
  productPrice: 2000,
  productDate: '12개월',
  productExp: 100,
  productAge: '10살이상',
  productEtc: '카드값',
};
