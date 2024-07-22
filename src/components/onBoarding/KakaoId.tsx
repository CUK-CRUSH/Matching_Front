import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ValidationButton from '@/components/validation/validationButton';
import ValidationPrevButton from '@/components/validation/validationPrevButton';
import ValidationText from '@/components/validation/validationText';
import useOnboardingStore from '@/store/validationStore';
import ProgressBar from '@/utils/ProgressBar';
import { useState, useEffect } from 'react';
import { CheckDuplicateButton } from '../validation/CheckDuplicateButton';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';

const KakaoIdPage = () => {
  const { setCurrentPage, setUserData, userData } = useOnboardingStore();

  const { control, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      kakaoId: userData.kakaoId || '',
      kakaoIdConfirm: '',
    },
  });

  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);

  const kakaoId = watch('kakaoId');
  const kakaoIdConfirm = watch('kakaoIdConfirm');
  const isIdMatch = kakaoId === kakaoIdConfirm && kakaoId.trim().length > 0;

  useEffect(() => {
    setUserData('kakaoId', kakaoId);
  }, [kakaoId, setUserData]);

  useEffect(() => {
    if (isDuplicate !== null) {
      console.log('Duplicate status:', isDuplicate);
    }
  }, [isDuplicate]);

  const handleNext = () => {
    if (isIdMatch && isDuplicate === false) {
      setCurrentPage('sex');
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="absolute w-full mt-2">
        <ProgressBar currentPage={3} totalPages={8} />
      </div>
      <div>
        <ValidationText
          titleTexts={['카카오톡 아이디']}
          descriptionTexts={[
            '매칭 진행 시, 상대와의 연락 수단으로',
            '카카오톡 아이디를 전달합니다',
          ]}
        />
        <div className="mt-16 mx-4">
          <div className="grid w-full max-w-sm items-center gap-1.5 relative">
            <Label htmlFor="kakaoId">ID 입력</Label>
            <Controller
              name="kakaoId"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="kakaoId"
                  placeholder="카카오톡 아이디를 입력해주세요"
                  {...field}
                />
              )}
            />
            <CheckDuplicateButton
              type="kakao"
              value={kakaoId}
              onResult={setIsDuplicate}
              disabled={!kakaoId}
            />
            {isDuplicate !== null && (
              <p className={`mt-2 ${isDuplicate ? 'text-red-500' : 'text-[#c6c6c6]'}`}>
                {!isDuplicate ? (
                  '사용 가능한 아이디입니다.'
                ) : (
                  <span className="flex items-center">
                    <ExclamationCircleOutlined className="mr-1" />
                    중복된 아이디입니다.
                  </span>
                )}
              </p>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
            <Label htmlFor="kakaoIdConfirm">입력 ID 확인</Label>
            <Controller
              name="kakaoIdConfirm"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="kakaoIdConfirm"
                  placeholder="입력한 동일 ID를 한번 더 입력해주세요"
                  {...field}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <ValidationPrevButton onStateChange={() => setCurrentPage('profileImage')} />
        <ValidationButton
          onStateChange={handleNext}
          buttonEnabled={isIdMatch && isDuplicate === false}
        />
      </div>
    </div>
  );
};

export default KakaoIdPage;
