import useOnboardingStore from '@/store/store';
import KakaoIdPage from '@/pages/onBoarding/KakaoId';
import LocationPage from '@/pages/onBoarding/Location';
import SexPage from '@/pages/onBoarding/Sex';
import NickNamePage from '@/pages/onBoarding/NickName';

const OnBoardingPage = () => {
  const { currentPage } = useOnboardingStore();
  return (
    <div>
      {currentPage === 'kakaoId' && <KakaoIdPage />}
      {currentPage === 'sex' && <SexPage />}
      {currentPage === 'location' && <LocationPage />}
      {currentPage === 'nickname' && <NickNamePage />}
    </div>
  );
};

export default OnBoardingPage;
