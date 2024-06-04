import { delay, http, HttpResponse } from 'msw';
import { MOCK_PRODUCT } from '@/fixture/product';

let product = { ...MOCK_PRODUCT };

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

  http.get('/v1/user', () => {
    return HttpResponse.json(product);
  }),

  // http.post('/v1/user', async ({ request }) => {
  //   const requestBody = await request.json(); // 요청 본문을 파싱합니다.

  //   // 이곳에서 requestBody를 활용하여 필요한 로직을 추가할 수 있습니다.

  //   return HttpResponse.json(
  //     {
  //       message: 'Post request received successfully',
  //       data: requestBody,
  //     },
  //     { status: 200 },
  //   );
  // }),
  http.post('/v1/user', async ({ request }) => {
    const formData = await request.formData();
    const updatedData: { [key: string]: any } = {};

    formData.forEach((value, key) => {
      updatedData[key] = value;
    });

    product = {
      ...product,
      data: {
        ...product.data,
        ...updatedData,
      },
    };

    return HttpResponse.json(
      {
        message: 'Post request received successfully',
        data: product,
      },
      { status: 200 },
    );
  }),
];
