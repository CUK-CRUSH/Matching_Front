import { delay, http, HttpResponse } from 'msw';
import { MOCK_PRODUCT } from '@/fixture/product';

export const handlers = [
  // An example handler
  http.get('/user', () => {
    return HttpResponse.json({ name: 'John Maverick' });
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

  http.post('/personalInfo', () => {
    return HttpResponse.json({ ...MOCK_PRODUCT });
  }),
];
