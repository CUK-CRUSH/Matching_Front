import type { Product } from '@/type/product';

export const MOCK_PRODUCT: Product = {
  id: '010-4619-3020',
  data: {
    profileImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/240301_Cha_Eun-woo.jpg/250px-240301_Cha_Eun-woo.jpg',
    kakaoId: 'wkdrhkdwls',
    sex: 'male',
    address: '서울시 강서구',
    location_X: 32.1,
    location_Y: 122.1,
    nickname: 'jangpang',
    birthDate: '1998년 09월 14일',
    oneLiner: '안녕?',
    mbti: 'enfj',
    tag: [{ music: ['인디', '국내힙합', 'POP'], hobby: ['LP모으기', '콘서트', '음악감상'] }],
    question: '',
    answer: '',
  },
};
