import Layout from "@/components/layout/layout";
import ProfileCard from "@/components/matching/ProfileCard";
import Footer from '@/components/layout/footer';
import { MOCK_PROFILECARD } from "@/fixture/ProfileCard";
import { Swiper, SwiperSlide } from 'swiper/react';

import ProfileCardHeader from '@/components/layout/profileCardheader';

import 'swiper/swiper-bundle.css';
import { useState } from "react";
import { ProfileCardProps } from "@/type/ProfileCard/ProfileCard";

const MatchingPage = () => {
  // 각 프로필 카드의 열고 닫기 상태를 관리하는 배열
  const [profiles, setProfiles] = useState<ProfileCardProps[]>(MOCK_PROFILECARD);

  // 프로필카드 열기
  const handleSetOpen = (index: number | undefined, value: boolean) => {
    setProfiles(prev =>
      prev.map((profile, i) =>
        i === index ? { ...profile, isOpen: value } : profile
      )
    );
  };

  return (
    <Layout backgroundColor={'#252525'}>
      <ProfileCardHeader />
      <Swiper>
        {
          profiles.map((item, index) => (
            <SwiperSlide
              className={item.isOpen ? 'swiper-no-swiping' : ''}
              key={index}
            >
              <ProfileCard
                {...item}
                index={index}
                isOpen={item.isOpen}
                setOpen={handleSetOpen}
              />
            </SwiperSlide>
          ))
        }
      </Swiper>

      <Footer />
    </Layout>
  );
};

export default MatchingPage;
