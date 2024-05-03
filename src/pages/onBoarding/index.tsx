import useOnboardingStore from '@/store/store';
import KakaoIdPage from '@/pages/onBoarding/KakaoId';
import LocationPage from '@/pages/onBoarding/Location';

const OnBoardingPage = () => {
  const { currentPage } = useOnboardingStore();
  return (
    <div>
      {currentPage === 'kakaoId' && <KakaoIdPage />}
      {currentPage === 'location' && <LocationPage />}
    </div>
  );
};

export default OnBoardingPage;
