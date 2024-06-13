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
  console.log(isOpen)
  return (
    <Layout backgroundColor={'#252525'}>
      <ProfileCardHeader />

      {/* allowTouchMove 가 안먹으면 조건문으로 스와이퍼를 없애는 방법으로 해야할듯... */}
      {!isOpen ?
        <Swiper
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          allowTouchMove={!isOpen}
        >
          {MOCK_PROFILECARD.map((item, index) => (
            <SwiperSlide key={index}>
              <ProfileCard key={index} {...item} isOpen={isOpen} setOpen={setOpen} />

            </SwiperSlide>
          ))}
        </Swiper> :
        <>
          {MOCK_PROFILECARD.map((item, index) => (
            <SwiperSlide key={index}>
              <ProfileCard key={index} {...item} isOpen={isOpen} setOpen={setOpen} />

            </SwiperSlide>
          ))}
        </>}
      <Footer />

    </Layout>
  );
};

export default MatchingPage;
