import useMyPageStore from '@/store/myPageStore';

const MusicPage = () => {
  const { setCurrentPage } = useMyPageStore();
  return <button onClick={() => setCurrentPage('mypage')}>Mysic</button>;
};

export default MusicPage;
