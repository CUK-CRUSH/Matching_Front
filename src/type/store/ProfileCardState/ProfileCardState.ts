export interface ProfileCardState {
  coin: number;
  setSpend2Coin: () => void;
  openMessage: boolean;
  setOpenMessage: () => void;
  ableSpend: boolean;
  setAbleSpend: (value : boolean) => void;
}