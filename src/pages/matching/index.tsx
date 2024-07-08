import Layout from "@/components/layout/layout";
import ProfileCardSummary from "@/components/matching/ProfileCard/ProfileCardSummary";
import Footer from '@/components/layout/footer';
import { Swiper, SwiperSlide } from 'swiper/react';

import ProfileCardHeader from '@/components/layout/profileCardheader';

import 'swiper/swiper-bundle.css';
import { useEffect, useState } from "react";
import { ProfileCardSummaryProps } from "@/type/services/ProfileCard/ProfileCard";
import { useQuery } from "@tanstack/react-query";
import { ProfileCardSummaryDTO } from "@/type/services/ProfileCard/ProfileCard";
import { getProfileCardData } from "@/services/ProfileCard/ProfileCardApi";
import { useSwiper } from 'swiper/react';

const MatchingPage = () => {

  // 프로필목록 조회
  const [page] = useState(0);
  const [size] = useState(10);
  const [radius] = useState(999999);

  const { data: profileCardData, error } = useQuery({
    queryKey: ['profileCardData'],
    queryFn: () => getProfileCardData(page, size, radius),
    staleTime: 1000 * 60 * 5, // 5분
    placeholderData: (previousData) => previousData,
  });

  const [profiles, setProfiles] = useState<ProfileCardSummaryProps[] | undefined>(profileCardData?.data?.profileCardSummaryResponses?.map(profile => ({
    ...profile,
    isModalOpen: false,
  })));

  useEffect(() => {
    setProfiles(profileCardData?.data?.profileCardSummaryResponses?.map(profile => ({
      ...profile,
      isModalOpen: false,
      isLock:true,
      isOpen: false,
    })));
  }, [profileCardData]);

  const [swiperIndex, setSwiperIndex] = useState(0);

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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!profileCardData) {
    return <div>Loading...</div>;
  }
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
  };
  return (
    <Layout backgroundColor={'#252525'}>
      <ProfileCardHeader />
      <Swiper  
        onActiveIndexChange={handleActiveIndexChange}>
       
        {profiles?.map((item, index) => (
          <SwiperSlide 
            
            key={index}
            >
            <ProfileCardSummary {...item}
            
            activeIndex={swiperIndex}
            handleSetOpen={handleSetOpen}
            handleSetModalOpen={handleSetModalOpen}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Footer />
    </Layout>
  );
};

export default MatchingPage;