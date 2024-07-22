import Layout from "@/components/layout/layout"
import Footer from '@/components/layout/footer';
import MatchingListHeader from "@/components/layout/matchingListHeader";
import ItemContainer from "@/components/matchingList/ItemContainer";
import ReceivedHeartItem from "@/components/matchingList/ReceivedItem";
import { useEffect, useRef, useState } from "react";
import useCustomScroll from "@/hooks/useCustomScrollBar/useCustomScrollBar";
import { useQuery } from "@tanstack/react-query";
import { getReciveLikedProfileCard } from "@/services/ProfileCard/LikeProfileCard";
import { ItemProps } from "@/type/services/LikeProfileCard/LikeProfileCard";
import { useCookies } from "react-cookie";

const ReceivedHeart = () => {

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
  
  const { data: receivedLikedProfileCardData, error: receivedLikedProfileCardError } = useQuery({
    queryKey: ['receivedLikedProfileCardData'],
    queryFn: () => getReciveLikedProfileCard(import.meta.env.VITE_DUETT_TOKEN, 0),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previousData) => previousData,
  });

  const [receiveMessageProfileCard, setReceiveMessageProfileCard] = useState<ItemProps[] | undefined>();

  useEffect(() => {
    if (isLastPage) return;

    getReciveLikedProfileCard(accessToken,page).then((response) => {
      if (response?.data?.length < size) {
        setIsLastPage(true);
      }
      setReceiveMessageProfileCard((prevProfiles) => {
        const newProfiles = response?.data;
        return prevProfiles ? [...prevProfiles, ...newProfiles] : newProfiles;
      });
    });
  }, [page, size]);
  
  if (!receivedLikedProfileCardData) {
    return <div>Error: </div>;
  }

  if (receivedLikedProfileCardError) {
    return <div>Loading...</div>;
  }
  return (
    <Layout backgroundColor='#252525'>
      <main className="min-h-full h-auto bg-matching-list relative flex flex-col">

        <MatchingListHeader text={'받은 하트'} background={'#252525'} />
        <div className="relative h-[calc(75vh)] overflow-y-scroll scrollbar-hide" ref={outerContainerRef} onScroll={calculateThumbY}>
          <ScrollBarThumb ref={thumbRef} height={thumbH} />
          <ItemContainer ref={innerContainerRef}>
            {receiveMessageProfileCard?.map((item, index) => (
              <ReceivedHeartItem key={index} {...item} />
            ))}
          </ItemContainer>
        </div>
        
        <Footer />
      </main>

    </Layout>
  )
}

export default ReceivedHeart