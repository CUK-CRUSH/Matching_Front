import MatchingListHeader from '@/components/layout/matchingListHeader';
import useMyPageStore from '@/store/myPageStore';
import PrepareIcon from '@/assets/Icon/PrepareIcon.svg';

const PreparingPage = () => {
  const { setCurrentPage } = useMyPageStore();
  return (
    <div className="text-white h-full flex flex-col items-center overflow-y-auto scrollbar-hide">
      <div className="w-full max-w-md mx-auto flex flex-col h-full">
        <MatchingListHeader
          text="결제관리"
          onStateChange={() => setCurrentPage('mypage')}
          mypageText="My Page | 나의 Duett"
          background="#252525"
        />
        <div className="flex flex-1 flex-col justify-center items-center mt-8 text-text_dary_soft text-xl">
          <img src={PrepareIcon} alt="prepare" className="w-16 h-16 mb-4" />
          <p>준비중인 페이지에요</p>
        </div>
      </div>
    </div>
  );
};

export default PreparingPage;
