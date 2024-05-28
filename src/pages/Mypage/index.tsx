import Layout from '@/components/layout/layout';
import Footer from '@/components/layout/footer';
import useMyPageStore from '@/store/myPageStore';
import MyPageMain from '@/components/MyPage/mypage';
import InfoPage from '@/components/MyPage/Info';
import IntroducePage from '@/components/MyPage/Introduce';
import MusicPage from '@/components/MyPage/Music';

const MyPage = () => {
  const { currentPage } = useMyPageStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'mypage':
        return <MyPageMain />;
      case 'info':
        return <InfoPage />;
      case 'introduce':
        return <IntroducePage />;
      case 'music':
        return <MusicPage />;
      default:
        return <MyPageMain />;
    }
  };

  return (
    <Layout>
      {renderPage()}
      <Footer />
    </Layout>
  );
};

export default MyPage;
