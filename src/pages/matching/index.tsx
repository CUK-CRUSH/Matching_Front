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
const [isOpen, setOpen] = useState<boolean[]>(MOCK_PROFILECARD.map(() => false));
const [activeIndex, setActiveIndex] = useState<number>(0);
console.log(isOpen)
console.log(isOpen[activeIndex])
const handleSetOpen = (index: number, value: boolean) => {
  setOpen(prev => prev.map((isOpen , i ) => i === index ? value : isOpen));
};
const handleSlideChange = (swiper: any) => {
  setActiveIndex(swiper.activeIndex);
};
  return (
    <Layout backgroundColor={'#252525'}>
      <ProfileCardHeader />
      <Swiper
        onSlideChange={handleSlideChange}
        allowTouchMove={!isOpen[activeIndex]}
      >
        {MOCK_PROFILECARD.map((item, index) => (
          <SwiperSlide key={index}>
            <ProfileCard key={index} {...item} 
              isOpen={isOpen[index]} 
              setOpen={(value: boolean) => handleSetOpen(index, value)}  
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Footer />
    </Layout>
  );
};

export default MatchingPage;
