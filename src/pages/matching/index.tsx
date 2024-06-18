import Layout from "@/components/layout/layout";
import ProfileCard from "@/components/matching/ProfileCard";
import Footer from '@/components/layout/footer';
import { MOCK_PROFILECARD } from "@/fixture/ProfileCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import ProfileCardHeader from '@/components/layout/profileCardheader';
import useSetOpen from '@/hooks/useSetOpen/useSetOpen';

import 'swiper/swiper-bundle.css';

const MatchingPage = () => {
  const { isOpen, setOpen } = useSetOpen();

  return (
    <Layout backgroundColor={'#252525'}>
      <ProfileCardHeader />
      <Swiper
        allowTouchMove={!isOpen} // 초기 설정
      >
        {MOCK_PROFILECARD.map((item, index) => (
          <SwiperSlide key={index}>
            <ProfileCard key={index} {...item} isOpen={isOpen} setOpen={setOpen} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Footer />
    </Layout>
  );
};

export default MatchingPage;
