import useOnboardingStore from '@/store/validationStore';
import KakaoIdPage from '@/pages/onBoarding/KakaoId';
import LocationPage from '@/pages/onBoarding/Location';
import SexPage from '@/pages/onBoarding/Sex';
import NickNamePage from '@/pages/onBoarding/NickName';
import BirthPage from '@/pages/onBoarding/Birth';
import ProfileImagePage from '@/pages/onBoarding/profileImage';
import OneLinerPage from '@/pages/onBoarding/OneLiner';

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
