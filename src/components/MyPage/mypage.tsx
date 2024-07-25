import { Avatar } from '@mui/material';
import { calculateAge } from '@/utils/CalculateAge';
import lock from '@/assets/ProfileCard/lock.svg';
import useMyPageStore from '@/store/myPageStore';
import { useQuery } from '@tanstack/react-query';
import { getMainData } from '@/services/Mypage/MypageAPI';
import Footer from '@/components/layout/footer';
import MatchingListHeader from '../layout/matchingListHeader';
import { MainInfoDataDTO } from '@/type/services/Mypage/MypageDTO';
import CircularProgressWithLabel from '@/utils/CircularProgressWithLabel ';
import UseAccessToken from '@/hooks/useAccessToken';
import Unlock from '@/assets/ProfileCard/Unlock.svg';
import useDecodedJWT from '@/hooks/useDecodedToken';

const MyPageMain = () => {
  const { setCurrentPage } = useMyPageStore();

  const accessToken = UseAccessToken();
  console.log(useDecodedJWT(accessToken));
  const {
    data: mainData,
    error,
    isLoading,
  } = useQuery<MainInfoDataDTO>({
    queryKey: ['mainData'],
    queryFn: () => getMainData(accessToken),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });

  // 각 페이지 별로 완료한 항목 수
  const infoCount = mainData?.data.infoCount === 2 ? 1 : 0;
  const introCount = mainData?.data.introCount === 4 ? 1 : 0;
  const musicCount = mainData?.data.musicCount === 2 ? 1 : 0;

  const unlockFullCount = infoCount + introCount + musicCount;
  //
  if (isLoading) {
    return <div>Loading...</div>; // 로딩 상태 처리
  }

  if (error) {
    return <div>Error loading data</div>; // 에러 상태 처리
  }

  // 데이터가 없을 때를 명확하게 처리
  if (!mainData) {
    return <div>No user data found</div>; // userData가 없을 때 처리
  }

  return (
    <div className=" text-white h-auto flex flex-col items-center pb-20 ">
      <div className="w-full max-w-md mx-auto pb-10">
        <MatchingListHeader text="My Page" router="matching" />
        {/* 상단 유저 정보 */}
        <div className="flex flex-col items-center mt-4">
          <Avatar
            src={mainData.data.profileImageUrl ?? undefined}
            sx={{ width: 80, height: 80 }}
            alt={mainData.data.profileImageUrl}
          />
          <h2 className="text-m font-bold mt-2">{mainData.data.name}</h2>
          <p className="text-m text-gray-400">
            {calculateAge(mainData.data.birthDate)}
            {mainData.data.mbti === 'NONE' || mainData.data.mbti === null
              ? ''
              : `  |   ${mainData.data.mbti}`}
          </p>
        </div>
        {/* 페이지 이동 버튼 */}
        <div className="flex justify-between mx-5 mt-4">
          <div>
            <p className="text-local_gray_2">프로필 수정</p>
          </div>
          <div className="flex flex-row">
            <img
              src={unlockFullCount === 3 ? Unlock : lock}
              alt={unlockFullCount === 3 ? 'Unlock' : 'Lock'}
              className="mr-1"
            />
            <span>{unlockFullCount}/3</span>
          </div>
        </div>
        <div className="flex justify-between items-center w-full px-4 mt-2">
          <button
            className="flex flex-col items-center flex-1 mx-1"
            onClick={() => setCurrentPage('info')}
          >
            <div className="flex flex-col items-center justify-center w-full bg-[#303030] rounded-lg aspect-square">
              <CircularProgressWithLabel value={mainData.data.infoCount} total={2} />
              <p className="text-white text-sm mt-1">내 정보</p>
            </div>
          </button>
          <button
            className="flex flex-col items-center flex-1 mx-1"
            onClick={() => setCurrentPage('introduce')}
          >
            <div className="flex flex-col items-center justify-center w-full bg-[#303030] rounded-lg aspect-square">
              <CircularProgressWithLabel value={mainData.data.introCount} total={4} />
              <p className="text-white text-sm mt-1">내 소개</p>
            </div>
          </button>
          <button
            className="flex flex-col items-center flex-1 mx-1"
            onClick={() => setCurrentPage('music')}
          >
            <div className="flex flex-col items-center justify-center w-full bg-[#303030] rounded-lg aspect-square">
              <CircularProgressWithLabel value={mainData.data.musicCount} total={2} />
              <p className="text-white text-sm mt-1">음악 취향</p>
            </div>
          </button>
        </div>
        {/* 밑에 공지사항들 */}
        <div id="text">
          <div className="flex flex-row items-center justify-center text-center mt-4 text-white font-bold text-sm gap-x-1">
            <img src={lock} alt="lock" />
            <p>정보를 입력을 모두 마치고, Duett을 더 자유롭게 사용해 보세요</p>
          </div>
          <div className="flex flex-col mt-8 w-full px-4">
            <h3 className="text-lg font-bold text-gray-300">나의 Duett</h3>
            <button
              onClick={() => setCurrentPage('location')}
              className="mt-2 text-left text-white pl-4"
            >
              내 위치 설정
            </button>
            <button className="mt-2 text-left text-white pl-4">결제관리</button>
          </div>
          <div className="flex flex-col mt-8 w-full px-4">
            <h3 className="text-lg font-bold text-gray-300">Duett 소식</h3>
            <button className="mt-2 text-left text-white pl-4">공지사항</button>
            <button className="mt-2 text-left text-white pl-4">약관 및 정책</button>
          </div>
          <div className="flex flex-col mt-8 w-full px-4">
            <h3 className="text-lg font-bold text-gray-300">회원관리</h3>
            <button className="mt-2 text-left text-white pl-4">로그아웃</button>
            <button
              onClick={() => setCurrentPage('signout')}
              className="mt-2 text-left text-white pl-4"
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyPageMain;
