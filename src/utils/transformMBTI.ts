import { MBTIState } from '@/type/store/MyPage/MypageState';

export const getMBTIString = (selectedMBTI: MBTIState) => {
  const { E_I, N_S, F_T, J_P } = selectedMBTI;
  return `${E_I ?? ''}${N_S ?? ''}${F_T ?? ''}${J_P ?? ''}`;
};
