import MatchingListHeader from '@/components/layout/matchingListHeader';
import ValidationText from '@/components/validation/validationText';
import useMyPageStore from '@/store/myPageStore';

const SignOutPage = () => {
  const { setCurrentPage } = useMyPageStore();
  return (
    <div className="text-white h-full flex flex-col items-center overflow-y-auto scrollbar-hide">
      <div className="w-full max-w-md mx-auto flex flex-col h-full">
        <MatchingListHeader
          text="회원 탈퇴"
          onStateChange={() => setCurrentPage('mypage')}
          mypageText="My Page | 나의 Duett"
        />
        <ValidationText
          titleTexts={['계정 탈퇴']}
          descriptionTexts={[
            '계정이 삭제될 경우',
            '기존의 계정 정보는 즉시 삭제되어',
            '이후에는 복구할 수 없어요.',
          ]}
        />
      </div>
    </div>
  );
};

export default SignOutPage;
