import { api } from '../client';


// 코인을 사용해서 프로필카드 상세 단일 조회하기
export const postMessage = async (
  accessToken: string,
  sendType?: number,
  receiverId?: number,
  content?: string,  
): Promise<any> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/message/send`;

  try {
    const response = await api.post(url, {
      sendType: sendType,
      receiverId: receiverId,
      content: content,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.error('메시지를 하지 못했습니다:', error);
    throw new Error('메시지를 하지 못했습니다');
  }
};

