import { atom } from 'recoil';

export const heightState = atom({
  key: 'heightState',
  default: 'calc(100vh + 100px)',
});
