import Layout from "@/components/layout/layout";
import ProfileCard from "@/components/matching/ProfileCard";
import Footer from '@/components/layout/footer';
import { MOCK_PROFILECARD } from "@/fixture/ProfileCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import ProfileCardHeader from '@/components/layout/profileCardheader';

import 'swiper/swiper-bundle.css';
import { useState } from "react";

const MatchingPage = () => {
  // 각 프로필 카드의 열고 닫기 상태를 관리하는 배열
  const [profiles, setProfiles] = useState(MOCK_PROFILECARD);

 // 프로필카드 열기
 const handleSetOpen = (index: number, value: boolean) => {
  setProfiles(prev => 
    prev.map((profile, i) => 
      i === index ? { ...profile, isOpen: value } : profile
    )
  );
};

// isOpen이 true인 프로필을 필터링
const openProfiles = profiles.filter(item => item.isOpen);

// isOpen이 false인 프로필을 필터링
const closedProfiles = profiles.filter(item => !item.isOpen);
  return (
    <Layout backgroundColor={'#252525'}>
      <ProfileCardHeader />

      <Swiper
        onSwiper={(swiper) => console.log(swiper.activeIndex)}
      >
        {openProfiles.length > 0 ? (
          openProfiles.map((item, index) => (
              <ProfileCard
                {...item}
                isOpen={item.isOpen}
                setOpen={(value: boolean) => handleSetOpen(index, value)}
              />
          ))
        ) : (
          closedProfiles.map((item, index) => (
            <SwiperSlide key={index}>
              <ProfileCard
                {...item}
                isOpen={item.isOpen}
                setOpen={(value: boolean) => handleSetOpen(index, value)}
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>

      <Footer />
    </Layout>
  );
};

export default MatchingPage;
