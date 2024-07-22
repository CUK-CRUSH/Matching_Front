import {
  getKakaoAuthentication,
  getNicknameAuthentication,
} from '@/services/Onboard/OnboardingAPI';
import { useState } from 'react';

type CheckDuplicateButtonProps = {
  type: 'kakao' | 'nickname';
  value: string;
  onResult: (exists: boolean) => void;
  disabled: boolean;
};

export const CheckDuplicateButton = ({
  type,
  value,
  onResult,
  disabled,
}: CheckDuplicateButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const handleClick = async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      let exists: boolean;
      if (type === 'kakao') {
        exists = await getKakaoAuthentication(value);
      } else {
        exists = await getNicknameAuthentication(value);
      }
      onResult(exists);
    } catch (error) {
      console.error('에러내용:', error);
      setIsError('Failed to check for duplicates');
    } finally {
      setIsLoading(false);
    }
  };
  console.log('exist' + onResult);
  return (
    <button
      className={`absolute w-16 h-7 right-2 top-1/4 transform bg-white text-[#858585] text-s rounded px-2 py-1 ${disabled ? 'cursor-not-allowed' : ''}`}
      onClick={handleClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? 'Checking...' : '중복체크'}
      {isError && <p className="text-red-500 text-xs mt-1">{isError}</p>}
    </button>
  );
};
