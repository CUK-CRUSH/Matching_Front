import useMyPageStore from '@/store/myPageStore';

const IntroducePage = () => {
  const { setCurrentPage } = useMyPageStore();
  return <button onClick={() => setCurrentPage('mypage')}>Introduce</button>;
};

export default IntroducePage;
