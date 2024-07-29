import { TermsResponseDTO } from '@/type/services/Terms/Terms';
import { api } from '../client';

// 약관 가져오기
export const getTermsData = async (): Promise<{
  signUpContent: string;
  privacyPolicyContent: string;
}> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/term`;
  try {
    const { data }: { data: TermsResponseDTO } = await api.get<TermsResponseDTO>(url);

    const signUpContent = data.data.signUpTerm.content;
    const privacyPolicyContent = data.data.privacyPolicyTerm.content;

    return { signUpContent, privacyPolicyContent };
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to fetch user info data');
  }
};
