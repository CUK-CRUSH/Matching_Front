import useMyPageStore from '@/store/myPageStore';

const InfoPage = () => {
  const { setCurrentPage } = useMyPageStore();
  return <button onClick={() => setCurrentPage('mypage')}>Info</button>;
};

export default InfoPage;
