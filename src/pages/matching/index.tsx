import Layout from "@/components/layout/layout";
import ProfileCard from "@/components/matching/ProfileCard";
import Footer from '@/components/layout/footer';
import { Swiper, SwiperSlide } from 'swiper/react';

import ProfileCardHeader from '@/components/layout/profileCardheader';

import 'swiper/swiper-bundle.css';
import { useEffect, useState } from "react";
import { ProfileCardProps } from "@/type/ProfileCard/ProfileCard";
import { useQuery } from "@tanstack/react-query";
import { ProfileCardDTO } from "@/type/services/ProfileCard/ProfileCard";
import { getProfileCardData } from "@/services/ProfileCard/ProfileCardApi";

const MatchingPage = () => {

  // 프로필목록 조회
  const { data: profileCardData, error } = useQuery<ProfileCardDTO>({
    queryKey: ['profileCardData',],
    queryFn: () => getProfileCardData(page, size, radius),
    staleTime: 1000 * 60 * 5, // 5분
    placeholderData: (previousData) => previousData,
  });

  const [page,] = useState(0);
  const [size,] = useState(10);
  const [radius,] = useState(999999);

  // 각 프로필 카드의 열고 닫기 상태를 관리하는 배열
  const [profiles, setProfiles] = useState<ProfileCardProps[] | undefined>(profileCardData?.data);

  useEffect(() => {
    setProfiles(profileCardData?.data);

  }, [profileCardData]);


  // 프로필카드 열기
  const handleSetOpen = (profileId: number | undefined, value: boolean) => {
    setProfiles((prev) =>
      prev?.map((profile: ProfileCardProps) =>
        profile.profileId === profileId ? { ...profile, isOpen: value } : profile
      )
    );
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
      <Swiper>
        {profiles?.map((item, index) => (
          <SwiperSlide key={index}>
            <ProfileCard {...item}
              setOpen={handleSetOpen}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Footer />
    </Layout>
  );
};

export default MatchingPage;