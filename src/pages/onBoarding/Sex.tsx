import { Button } from '@/components/ui/button';
import ValidationButton from '@/components/validation/validationButton';
import ValidationText from '@/components/validation/validationText';
import useOnboardingStore from '@/store/store';
import { useState } from 'react';

const SexPage = () => {
  const { setCurrentPage } = useOnboardingStore();
  const [selectedSex, setSelectedSex] = useState('');

  const handleSelectSex = (sex: string) => {
    setSelectedSex(sex);
  };
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <ValidationText
          titleTexts={['성별 설정']}
          descriptionTexts={['성별을 선택해주세요', '한번 선택하면 변경할 수 없어요']}
        />
        <div className="flex justify-center space-x-2 mt-28 mx-4">
          <Button
            className={`bg-white text-black w-24 h-16 shadow-md ${selectedSex === 'male' ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => handleSelectSex('male')}
          >
            남성
          </Button>
          <Button
            className={`bg-white text-black w-24 h-16 shadow-md ${selectedSex === 'female' ? 'bg-pink-500 text-white' : ''}`}
            onClick={() => handleSelectSex('female')}
          >
            여성
          </Button>
        </div>
      </div>

      <ValidationButton
        onStateChange={() => setCurrentPage('location')}
        buttonEnabled={selectedSex !== ''}
      />
    </div>
  );
};

export default SexPage;
