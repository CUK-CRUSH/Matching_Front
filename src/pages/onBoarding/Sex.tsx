import { Button } from '@/components/ui/button';
import ValidationButton from '@/components/validation/validationButton';
import ValidationPrevButton from '@/components/validation/validationPrevButton';
import ValidationText from '@/components/validation/validationText';
import useOnboardingStore from '@/store/validationStore';
import ProgressBar from '@/utils/ProgressBar';

const SexPage = () => {
  const { setCurrentPage, userData, setUserData } = useOnboardingStore();

  const handleSelectSex = (sex: string) => {
    setUserData('sex', sex);
  };
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="absolute w-full mt-2">
        <ProgressBar currentPage={4} totalPages={8} />
      </div>
      <div>
        <ValidationText
          titleTexts={['성별 설정']}
          descriptionTexts={['성별을 선택해주세요', '한번 선택하면 변경할 수 없어요']}
        />
        <div className="flex justify-center space-x-2 mt-28 mx-4">
          <Button
            variant={'noHover'}
            className={`bg-white text-black w-24 h-16 shadow-md ${userData.sex === 'male' ? 'bg-[#252525] text-[#f8f8f8]' : ''}`}
            onClick={() => handleSelectSex('male')}
          >
            남성
          </Button>
          <Button
            variant={'noHover'}
            className={`bg-white text-black w-24 h-16 shadow-md ${userData.sex === 'female' ? 'bg-[#252525] text-[#f8f8f8]' : ''}`}
            onClick={() => handleSelectSex('female')}
          >
            여성
          </Button>
        </div>
      </div>

      <div className="flex">
        <ValidationPrevButton onStateChange={() => setCurrentPage('kakaoId')} />

        <ValidationButton
          onStateChange={() => setCurrentPage('location')}
          buttonEnabled={userData.sex !== ''}
        />
      </div>
    </div>
  );
};

export default SexPage;
