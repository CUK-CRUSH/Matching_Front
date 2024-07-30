export interface ProfileCardState {
  coin: number;
  setSpend2Coin: () => void;
  openMessage: boolean;
  setOpenMessage: () => void;
  ableSpend: boolean;
  setAbleSpend: (value : boolean) => void;
  index? : number;
  setIndex: (newIndex: number | undefined) => void; // setIndex 메서드 추가
}