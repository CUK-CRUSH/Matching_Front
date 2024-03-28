export type Covered = {
  coveredName: string;
  diseaseName: string;
  coveredPrice: string;
};

export type Product = {
  productName: string;
  coveredList: Covered[];
  productPrice: number;
  productDate: string;
  productExp: number;
  productAge: string;
  productEtc: string;
};
