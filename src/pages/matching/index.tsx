import Layout from "@/components/layout/layout";
import ProfileCard from "@/components/matching/ProfileCard";
import Footer from '@/components/layout/footer';
import { MOCK_PROFILECARD } from "@/fixture/ProfileCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import ProfileCardHeader from '@/components/layout/profileCardheader';

import 'swiper/swiper-bundle.css';

const MatchingPage = () => {

  return (
    <Layout backgroundColor={'#252525'}>
      <ProfileCardHeader />

      <Swiper
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        // allowTouchMove={isSlideEnabled} // 터치 슬라이딩 허용 여부
      >
        {MOCK_PROFILECARD.map((item, index) => (
          <SwiperSlide key={index}>

            <ProfileCard key={index} {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Footer />

    </Layout>
  );
};

export default MatchingPage;
