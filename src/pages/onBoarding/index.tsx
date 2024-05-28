import useOnboardingStore from '@/store/validationStore';
import KakaoIdPage from '@/components/onBoarding/KakaoId';
import LocationPage from '@/components/onBoarding/Location';
import SexPage from '@/components/onBoarding/Sex';
import NickNamePage from '@/components/onBoarding/NickName';
import BirthPage from '@/components/onBoarding/Birth';
import ProfileImagePage from '@/components/onBoarding/profileImage';
import OneLinerPage from '@/components/onBoarding/OneLiner';

const OnBoardingPage = () => {
  const { currentPage } = useOnboardingStore();
  return (
    <div>
      {currentPage === 'profileImage' && <ProfileImagePage />}
      {currentPage === 'kakaoId' && <KakaoIdPage />}
      {currentPage === 'sex' && <SexPage />}
      {currentPage === 'location' && <LocationPage />}
      {currentPage === 'nickname' && <NickNamePage />}
      {currentPage === 'birth' && <BirthPage />}
      {currentPage === 'oneLiner' && <OneLinerPage />}
    </div>
  );
};

export default OnBoardingPage;
