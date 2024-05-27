import { Button } from '@/components/ui/button';
import ValidationButton from '@/components/validation/validationButton';
import ValidationPrevButton from '@/components/validation/validationPrevButton';
import ValidationText from '@/components/validation/validationText';
import useOnboardingStore from '@/store/validationStore';

const ProfileImagePage = () => {
  const { setCurrentPage, userData, setUserData } = useOnboardingStore();

  const handleSelectSex = (sex: string) => {
    setUserData('sex', sex);
  };
  return (
    <div className="flex flex-col justify-between h-screen">
      <p>이미지 ㅎㅎㅎ</p>

      <div className="flex">
        <ValidationPrevButton navigation="/login" />

        <ValidationButton
          onStateChange={() => setCurrentPage('kakaoId')}
          //   buttonEnabled={userData.sex !== ''}
        />
      </div>
    </div>
  );
};

export default ProfileImagePage;
