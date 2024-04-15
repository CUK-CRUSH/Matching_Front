import { delay, http, HttpResponse } from 'msw';
import { MOCK_PRODUCT } from '@/fixture/product';

const todos = [
  {
    id: '1',
    title: 'jimmy',
  },
  { id: '2', title: 'jimmy2' },
  { id: '3', title: 'jimmy3' },
  { id: '4', title: 'jimmy4' },
  { id: '5', title: 'jimmy5' },
];

export const handlers = [
  // An example handler
  http.get('/user', () => {
    return HttpResponse.json(todos);
  }),

  http.get('/error', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        message: 'mock 에러입니다',
      },
      { status: 400 },
    );
  }),

  http.get('/personalInfo', () => {
    return HttpResponse.json({ ...MOCK_PRODUCT });
  }),

  http.post('/personalInfo', () => {
    return HttpResponse.json({ ...MOCK_PRODUCT });
  }),
];
