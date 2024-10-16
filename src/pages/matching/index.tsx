import Layout from '@/components/layout/layout';
import ProfileCard from '@/components/matching/ProfileCard/ProfileCard';
import Footer from '@/components/layout/footer';
import { Swiper, SwiperSlide } from 'swiper/react';

import ProfileCardHeader from '@/components/layout/profileCardheader';

import 'swiper/swiper-bundle.css';
import { useEffect, useState } from 'react';
import { ProfileCardSummaryProps } from '@/type/services/ProfileCard/ProfileCard';
import { useQuery } from '@tanstack/react-query';
import { getProfileCardData } from '@/services/ProfileCard/ProfileCardApi';
import { useCookies } from 'react-cookie';
import UnFilledModal from '@/components/matching/Modal/UnFilledModal';
import UnlockModal from '@/components/matching/Modal/UnlockModal';
import PostMessageModal from '@/components/matching/PostMessageModal';
import useProfileCardStore from '@/store/profileCardStore';
import YoutubeModal from '@/components/matching/Modal/YoutubeModal';

const MatchingPage = () => {
  const { openMessage } = useProfileCardStore();

  // 프로필목록 조회
  const [page] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [size] = useState(10);
  const [radius] = useState(999999);

  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const { data: profileCardData, error } = useQuery({
    queryKey: ['profileCardData'],
    queryFn: () => getProfileCardData(accessToken, page, size, radius, true),
    staleTime: 1000 * 60 * 5, // 5분
    placeholderData: (previousData) => previousData,
  });

  const [profiles, setProfiles] = useState<ProfileCardSummaryProps[] | undefined>();

  useEffect(() => {
    if (isLastPage || page === 0) {
      // setPage(page + 1);
      setIsLastPage(false);
      getProfileCardData(accessToken, page, size, radius, true).then((response) => {
        sessionStorage.setItem('isProfileComplete', String(response?.data?.isProfileComplete));
        // 프로필 데이터 추가
        setProfiles((prevProfiles) => {
          const newProfiles = response.data.profileCardSummaryResponses.map((profile) => ({
            ...profile,
            isLock: true,
            isOpen: false,
          }));
          return prevProfiles ? [...prevProfiles, ...newProfiles] : newProfiles;
        });
        // 페이지 더하기
      });
    }
  }, [page, size, radius, isLastPage]);

  const [swiperIndex, setSwiperIndex] = useState(0);

  // 닥달 모달창
  const [isUnfilledModalOpen, setIsUnfilledModalOpen] = useState<boolean>(false);

  // 오픈 모달창
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState<boolean>(false);

  // 유튜브 모달창
  const { isYoutubeModalOpen, setIsYoutubeModalOpen } = useProfileCardStore();

  // 오픈상태

  // 프로필카드 열기
  const handleSetOpen = (activeIndex: number | undefined, value: boolean) => {
    setProfiles((prev) =>
      prev?.map((profile: ProfileCardSummaryProps, index) =>
        index === activeIndex ? { ...profile, isOpen: value } : profile,
      ),
    );
  };

  // 모달창 열기
  const handleSetModalOpen = (activeIndex: number | undefined, value: boolean) => {
    setProfiles((prev) =>
      prev?.map((profile: ProfileCardSummaryProps, index) =>
        index === activeIndex ? { ...profile, isModalOpen: value } : profile,
      ),
    );
  };

  // 잠금해제
  const handleSetLockOpen = (activeIndex: number | undefined, value: boolean) => {
    setProfiles((prev) =>
      prev?.map((profile: ProfileCardSummaryProps, index) =>
        index === activeIndex ? { ...profile, isLock: value } : profile,
      ),
    );
  };

  // 슬라이드하면 이전 카드 접기
  const handleActiveIndexChange = (swiperCore: any) => {
    const newIndex = swiperCore.activeIndex;

    // 이전 슬라이드 상태 초기화
    if (swiperIndex !== newIndex) {
      // 혹시모르니까
      handleSetOpen(swiperIndex - 1, false); // 이전 슬라이드 상태 초기화
      handleSetOpen(swiperIndex + 1, false); // 이전 슬라이드 상태 초기화
      handleSetOpen(swiperIndex, false); // 이전 슬라이드 상태 초기화

      setIsUnlockModalOpen(false);
      setIsUnfilledModalOpen(false);
    }

    // 현재 슬라이드 상태 업데이트
    setSwiperIndex(newIndex);

    // useEffect(() => {
    //   // swiperIndex가 변경될 때마다 페이지 최상단으로 스크롤
    //   window.scrollTo(0, 0);
    // }, [swiperIndex]);

    if (sessionStorage.getItem('isProfileComplete') === 'false' && newIndex >= 3) {
      setIsUnfilledModalOpen(true);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!profileCardData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout backgroundColor={'#252525'}>
      <ProfileCardHeader />

      {isUnfilledModalOpen && <UnFilledModal setIsUnfilledModalOpen={setIsUnfilledModalOpen} />}
      {isUnlockModalOpen && (
        <UnlockModal
          setIsUnlockModalOpen={setIsUnlockModalOpen}
          handleSetModalOpen={handleSetModalOpen}
          activeIndex={profiles?.[swiperIndex].profileId}
        />
      )}
      {isYoutubeModalOpen && <YoutubeModal setIsYoutubeModalOpen={setIsYoutubeModalOpen} />}

      {openMessage && <PostMessageModal />}

      <Swiper onActiveIndexChange={handleActiveIndexChange}>
        {profiles && profiles.length > 0 ? (
          profiles.map((item, index) => (
            <SwiperSlide key={index}>
              <ProfileCard
                {...item}
                index={item?.profileId}
                activeIndex={swiperIndex}
                handleSetOpen={handleSetOpen}
                handleSetModalOpen={handleSetModalOpen}
                handleSetLockOpen={handleSetLockOpen}
                setIsUnfilledModalOpen={setIsUnfilledModalOpen}
                setIsUnlockModalOpen={setIsUnlockModalOpen}
                isUnlockModalOpen={isUnlockModalOpen}
              />
            </SwiperSlide>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mx-[2%] w-[96%] h-[90vh]">
            <div className="bg-[#2f2f2f] text-white p-5 rounded-lg shadow-lg">
              <div className="text-lg font-bold mb-3">현재 매칭된 상대가 없습니다.</div>
              <div className="text-center mb-5">새로운 인연을 위해 프로필을 꾸며 보세요!</div>
            </div>
          </div>
        )}
      </Swiper>
      <Footer />
    </Layout>
  );
};

export default MatchingPage;
