import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ValidationButton from '@/components/validation/validationButton';
import ValidationText from '@/components/validation/validationText';
import useOnboardingStore from '@/store/store';
import { useState } from 'react';

const KakaoIdPage = () => {
  const { setCurrentPage } = useOnboardingStore();
  const [kakaoId, setKakaoId] = useState('');
  const [kakaoIdConfirm, setKakaoIdConfirm] = useState('');
  const isIdMatch = kakaoId === kakaoIdConfirm && kakaoId.length > 0;
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <ValidationText
          titleTexts={['카카오톡 아이디']}
          descriptionTexts={[
            '매칭 진행 시, 상대와의 연락 수단으로',
            '카카오톡 아이디를 전달합니다',
          ]}
        />
        <div className="mt-16 mx-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="kakaoIdConfirm">ID 입력</Label>
            <Input
              type="text"
              id="kakaoId"
              placeholder="카카오톡 아이디를 입력해주세요"
              onChange={(e) => setKakaoId(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
            <Label htmlFor="kakaoIdConfirm">입력 ID 확인</Label>
            <Input
              type="text"
              id="kakaoIdConfirm"
              placeholder="입력한 동일 ID를 한번 더 입력해주세요"
              onChange={(e) => setKakaoIdConfirm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <ValidationButton onStateChange={() => setCurrentPage('sex')} buttonEnabled={isIdMatch} />
    </div>
  );
};

export default KakaoIdPage;
