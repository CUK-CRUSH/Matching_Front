import { Avatar } from '@mui/material';
import { calculateAge } from '@/utils/CalculateAge';
import lock from '@/assets/ProfileCard/lock.svg';
import useMyPageStore from '@/store/myPageStore';
import { useQuery } from '@tanstack/react-query';
import { getMainData } from '@/services/Mypage/MypageAPI';
import Footer from '@/components/layout/footer';
import MatchingListHeader from '../layout/matchingListHeader';
import { useCookies } from 'react-cookie';
import { MainInfoDataDTO } from '@/type/services/Mypage/MypageDTO';
import CircularProgressWithLabel from '@/utils/CircularProgressWithLabel ';

const MyPageMain = () => {
  const { setCurrentPage } = useMyPageStore();
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const { data: mainData, error } = useQuery<MainInfoDataDTO>({
    queryKey: ['mainData'],
    queryFn: () => getMainData(accessToken),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });

  if (error) {
    return <div>error</div>;
  }
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
            {calculateAge(mainData.data.birthDate)} | {mainData.data.mbti}
          </p>
        </div>
        {/* 페이지 이동 버튼 */}
        <div className="flex justify-between items-center mt-4 w-full px-4">
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
          <div className="flex flex-row items-center justify-center text-center mt-4 text-gray-400 text-sm gap-x-1">
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
            <button className="mt-2 text-left text-white pl-4">회원 탈퇴</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyPageMain;
