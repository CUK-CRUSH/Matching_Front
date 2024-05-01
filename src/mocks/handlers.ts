import { delay, http, HttpResponse } from 'msw';
import { MOCK_PRODUCT } from '@/fixture/product';
import { MOCK_EXAMPLE_PRODUCT } from '@/fixture/example';
export const handlers = [
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

  http.get("https://api.github.com/repos/tannerlinsley/react-query", async () => {
    return HttpResponse.json({...MOCK_EXAMPLE_PRODUCT});
  }),

  http.post('/personalInfo', () => {
    return HttpResponse.json({ ...MOCK_PRODUCT });
  }),
];
