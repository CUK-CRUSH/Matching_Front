import Layout from "@/components/layout/layout";
import ProfileCard from "@/components/matching/ProfileCard";
import Footer from '@/components/layout/footer';
import { MOCK_PROFILECARD } from "@/fixture/ProfileCard";
import { Swiper, SwiperSlide } from 'swiper/react';

import ProfileCardHeader from '@/components/layout/profileCardheader';

import 'swiper/swiper-bundle.css';
import { useEffect, useState } from "react";
import { ProfileCardProps } from "@/type/ProfileCard/ProfileCard";
import { useQuery } from "@tanstack/react-query";
import { ProfileCardDTO } from "@/type/services/ProfileCard/ProfileCard";
import { getProfileCardData } from "@/services/ProfileCard/ProfileCardApi";

const MatchingPage = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [radius, setRadius] = useState(999999);

  const { data : profileCardData, error, refetch } = useProfileCardData(page, size, radius);

  // 각 프로필 카드의 열고 닫기 상태를 관리하는 배열
  const [profiles, setProfiles] = useState<ProfileCardProps[] | undefined>(profileCardData);
  console.log(profileCardData);
  useEffect(() => {
      setProfiles(profileCardData);

  }, [profileCardData]);

  // 프로필카드 열기
  const handleSetOpen = (index: number | undefined, value: boolean) => {
    setProfiles((prev) =>
      prev?.map((profile: ProfileCardProps, i: number) =>
        i === index ? { ...profile, isOpen: value } : profile
      )
    );
  };
  console.log(profileCardData.map((i) => console.log(i)));

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
interface ProfileCardData {
  data: ProfileCardProps[];
  error?: Error;
  refetch: () => void;
}

const useProfileCardData = (
  page: number,
  size: number,
  radius: number
): ProfileCardData => {
  const { data, error, refetch } = useQuery<ProfileCardDTO, Error>({
    queryKey: ['profileCardData', page, size, radius],
    queryFn: () => getProfileCardData(page, size, radius),
    staleTime: 1000 * 60 * 5, // 5분
    enabled: true, // 자동 리팻치 비활성화
  });

  return {
    data: data?.data || [],
    error : error || undefined,
    refetch,
  };
};


export default MatchingPage;
