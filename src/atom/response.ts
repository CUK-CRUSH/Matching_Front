import { atom } from 'recoil';

interface Coverage {
  coveredName: string;
  diseaseName: string;
  coveredPrice: string;
}

interface InsuranceProduct {
  productName: string;
  coveredList: Coverage[];
  productPrice: number;
  productDate: string;
  productExp: number;
  productAge: string;
  productEtc?: string;
}

export const insuranceProductState = atom<InsuranceProduct>({
  key: 'insuranceProductState',
  default: {
    // 초기값 설정
    productName: '',
    coveredList: [],
    productPrice: 0,
    productDate: '',
    productExp: 0,
    productAge: '',
  },
});
