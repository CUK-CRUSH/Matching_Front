import { api } from '../client';
import { SendedMessageItemPropsDTO } from "@/type/services/LikeProfileCard/LikeProfileCard";


// 메시지 보내기
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

export const getReciveMessageProfileCard = async (
  accessToken : string,
  page?: number,
): Promise<SendedMessageItemPropsDTO> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/message/receive/all?page=${page}`;
  try {
    const { data } = await api.get<SendedMessageItemPropsDTO>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to fetch user info data');
  }
};

// 발신메시지
export const getSendedMessageProfileCard = async (
  accessToken: string,
  page: number,
): Promise<SendedMessageItemPropsDTO> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/message/send/all?page=${page}`;
  try {
    const { data } = await api.get<SendedMessageItemPropsDTO>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(data)
    return data;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to fetch user info data');
  }
};
