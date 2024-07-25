import Layout from "@/components/layout/layout";
import ProfileCard from "@/components/matching/ProfileCard/ProfileCard";
import Footer from '@/components/layout/footer';
import { Swiper, SwiperSlide } from 'swiper/react';

import ProfileCardHeader from '@/components/layout/profileCardheader';

import 'swiper/swiper-bundle.css';
import { useEffect, useState } from "react";
import { ProfileCardSummaryProps } from "@/type/services/ProfileCard/ProfileCard";
import { useQuery } from "@tanstack/react-query";
import { getProfileCardData } from "@/services/ProfileCard/ProfileCardApi";
import { useCookies } from "react-cookie";
import UnFilledModal from "@/components/matching/Modal/UnFilledModal";

const MatchingPage = () => {

  // 프로필목록 조회
  const [page, ] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [size] = useState(10);
  const [radius] = useState(999999);

  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  
  const { data: profileCardData, error } = useQuery({
    queryKey: ['profileCardData'],
    queryFn: () => getProfileCardData(accessToken, page,size, radius,true),
    staleTime: 1000 * 60 * 5, // 5분
    placeholderData: (previousData) => previousData,
  });

  const [profiles, setProfiles] = useState<ProfileCardSummaryProps[] | undefined>();
  
  useEffect(() => {
    if (isLastPage || page === 0){
      // setPage(page + 1);
      setIsLastPage(false);
      getProfileCardData(accessToken,page, size, radius,true).then((response) => {
        sessionStorage.setItem('isProfileComplete',String(response?.data?.isProfileComplete))
        // 프로필 데이터 추가
        setProfiles((prevProfiles) => {
          const newProfiles = response.data.profileCardSummaryResponses.map(profile => ({
            ...profile,
            isModalOpen: false,
            isLock: true,
            isOpen: false,
          }));
          return prevProfiles ? [...prevProfiles, ...newProfiles] : newProfiles;
        });
        // 페이지 더하기
      }
    );
    }
    
    
  }, [page, size, radius , isLastPage]);
  

  const [swiperIndex, setSwiperIndex] = useState(0);

  // 모달창
  const [isUnfilledModalOpen,setIsUnfilledModalOpen] = useState<boolean>(false)
  
  // 프로필카드 열기
  const handleSetOpen = (activeIndex: number | undefined, value: boolean) => {
    setProfiles((prev) =>
      prev?.map((profile: ProfileCardSummaryProps,index) =>
        index === activeIndex ? { ...profile, isOpen: value } : profile
      )
    );
  };

  // 모달창 열기
  const handleSetModalOpen = (activeIndex: number | undefined, value: boolean) => {
    setProfiles((prev) =>
      prev?.map((profile: ProfileCardSummaryProps,index) =>
        index === activeIndex ? { ...profile, isModalOpen: value } : profile ,    
      )
    );
  };

  // 잠금해제
  const handleSetLockOpen = (activeIndex: number | undefined, value: boolean) => {
    setProfiles((prev) =>
      prev?.map((profile: ProfileCardSummaryProps,index) =>
        index === activeIndex ? { ...profile, isLock: value } : profile ,    
      )
    );
  };

  
  // 슬라이드하면 이전 카드 접기
  const handleActiveIndexChange = (swiperCore : any) => {
    const newIndex = swiperCore.activeIndex;

    // 이전 슬라이드 상태 초기화
    if (swiperIndex !== newIndex) {
      handleSetOpen(swiperIndex - 1, false);  // 이전 슬라이드 상태 초기화
      handleSetOpen(swiperIndex + 1, false);  // 이전 슬라이드 상태 초기화
      handleSetModalOpen(swiperIndex + 1, false);  // 이전 슬라이드 상태 초기화
      handleSetModalOpen(swiperIndex - 1, false)
    }

    // 현재 슬라이드 상태 업데이트
    setSwiperIndex(newIndex);
    console.log(newIndex, profiles?.length)
    // 스와이프시 페이징
    // if (profiles && newIndex === profiles?.length - 1 && !isLastPage) {
    //   console.log('trigger')
    //   // 새로운 데이터 불러오기
    //   setIsLastPage(true)
    // }

    if(sessionStorage.getItem('isProfileComplete') === 'false' && newIndex >= 3){
      setIsUnfilledModalOpen(true)
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
      <Swiper  
        onActiveIndexChange={handleActiveIndexChange}>
       
        {profiles?.map((item, index) => (
          <SwiperSlide 
            
            key={index}
            >
            <ProfileCard {...item}
            
            activeIndex={swiperIndex}
            handleSetOpen={handleSetOpen}
            handleSetModalOpen={handleSetModalOpen}
            handleSetLockOpen={handleSetLockOpen}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Footer />
    </Layout>
  );
};

export default MatchingPage;