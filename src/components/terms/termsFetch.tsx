import { getTermsData } from '@/services/Term/TermAPI';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useFetchTerms = (termType: 'signUpContent' | 'privacyPolicyContent') => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const data = await getTermsData();
        if (termType === 'signUpContent') {
          setContent(data.signUpContent);
        } else if (termType === 'privacyPolicyContent') {
          setContent(data.privacyPolicyContent);
        }
      } catch (error) {
        console.error('Failed to fetch terms data:', error);
        setError('Failed to fetch terms data');
        toast.error('약관 내용을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTerms();
  }, [termType]);

  return { content, isLoading, error };
};

export default useFetchTerms;
