import Layout from "@/components/layout/layout"
import Footer from '@/components/layout/footer';
import MatchingListHeader from "@/components/layout/matchingListHeader";
import ItemContainer from "@/components/matchingList/ItemContainer";
import SendedItem from "@/components/matchingList/SendedItem";
import { useEffect, useRef, useState } from "react";
import useCustomScroll from "@/hooks/useCustomScrollBar/useCustomScrollBar";
import { useQuery } from "@tanstack/react-query";
import { getSendedLikedProfileCard } from "@/services/ProfileCard/LikeProfileCard";
import { ItemProps } from "@/type/MatchingList/MatchingList";
import { useCookies } from "react-cookie";

const SendedHeart = () => {
  // 스크롤바
  const outerContainerRef = useRef<HTMLDivElement | null>(null);
  const innerContainerRef = useRef<HTMLDivElement | null>(null);
  const { ScrollBarThumb, calculateThumbY, thumbH, thumbRef } = useCustomScroll(
    {
      outerContainerRef,
      innerContainerRef,
      outerContainerBorderWidth: 1
    }
  );

  const [page, ] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [size] = useState<number>(10);

  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  
  const { data: likedProfileCardData, error } = useQuery({
    queryKey: ['profileCardData'],
    queryFn: () => getSendedLikedProfileCard(accessToken,page),
    staleTime: 1000 * 60 * 5, // 5분
    placeholderData: (previousData) => previousData,
  });

  const [profiles, setProfiles] = useState<ItemProps[] | undefined>();

  useEffect(() => {
    if (isLastPage) return;

    getSendedLikedProfileCard(accessToken,page).then((response) => {
      if (response?.data?.length < size) {
        setIsLastPage(true);
      }
      setProfiles((prevProfiles) => {
        const newProfiles = response?.data;
        return prevProfiles ? [...prevProfiles, ...newProfiles] : newProfiles;
      });
    });
  }, [page, size]);
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!likedProfileCardData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout backgroundColor='#252525'>
      <main className="min-h-full h-auto bg-matching-list relative flex flex-col pb-[100px]">

        <MatchingListHeader text={'보낸 하트'} background={'#252525'} />
        <div className="relative h-[calc(75vh)] overflow-y-scroll scrollbar-hide" ref={outerContainerRef} onScroll={calculateThumbY}>
          <ScrollBarThumb ref={thumbRef} height={thumbH} />

          <ItemContainer ref={innerContainerRef}>
            {profiles?.map((item, index) => (
              <SendedItem key={index} {...item} />
            ))}

          </ItemContainer>  
        </div>
        <Footer />
      </main>

    </Layout>
  )
}

export default SendedHeart