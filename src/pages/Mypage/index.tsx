import Layout from '@/components/layout/layout';
import useMyPageStore from '@/store/myPageStore';
import MyPageMain from '@/components/MyPage/mypage';
import InfoPage from '@/components/MyPage/Info';
import IntroducePage from '@/components/MyPage/Introduce';
import MusicPage from '@/components/MyPage/Music/Music';
import TagsPage from '@/components/MyPage/Tags';
import ChangeLocationPage from '@/components/MyPage/Location/ChangeLocation';
import MusicDetailPage from '@/components/MyPage/Music/MusicDetail';
import MusicMoodPage from '@/components/MyPage/Music/MusicMood';

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
      case 'musicDetail':
        return <MusicDetailPage />;
      case 'tags':
        return <TagsPage />;
      case 'location':
        return <ChangeLocationPage />;
      case 'mood':
        return <MusicMoodPage />;
      default:
        return <MyPageMain />;
    }
  };

  return <Layout backgroundColor="#252525">{renderPage()}</Layout>;
};

export default MyPage;
