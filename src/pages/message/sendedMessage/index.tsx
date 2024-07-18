import Layout from "@/components/layout/layout"
import Footer from '@/components/layout/footer';
import MatchingListHeader from "@/components/layout/matchingListHeader";
import ItemContainer from "@/components/matchingList/ItemContainer";
import { useEffect, useRef, useState } from "react";
import useCustomScroll from "@/hooks/useCustomScrollBar/useCustomScrollBar";
import { useQuery } from "@tanstack/react-query";
import { getSendedMessageProfileCard } from "@/services/ProfileCard/MessageProfileCard";
import { MessageItemProps } from "@/type/services/LikeProfileCard/LikeProfileCard";
import SendedMessageItem from "@/components/matchingList/SendedMessageItem";


const SendedMessage = () => {
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

  const { data: sendedMessageProfileCardData, error } = useQuery({
    queryKey: ['sendedMessageProfileCardData'],
    queryFn: () => getSendedMessageProfileCard(import.meta.env.VITE_DUETT_TOKEN,page),
    staleTime: 1000 * 60 * 5, // 5분
    placeholderData: (previousData) => previousData,
  });

  const [sendedMessageProfileCard, setSendedMessageProfileCard] = useState<MessageItemProps[] | undefined>();

  useEffect(() => {
    if (isLastPage) return;

    getSendedMessageProfileCard(import.meta.env.VITE_DUETT_TOKEN,page).then((response) => {
      if (response?.data?.length < size) {
        setIsLastPage(true);
      }
      setSendedMessageProfileCard((prevProfiles) => {
        const newProfiles = response?.data;
        return prevProfiles ? [...prevProfiles, ...newProfiles] : newProfiles;
      });
    });
  }, [page, size]);

  if (!sendedMessageProfileCardData) {
    return <div>Error: </div>;
  }

  if (error) {
    return <div>Loading...</div>;
  }
  return (
    <Layout backgroundColor='#252525'>
      <main className="min-h-full h-auto bg-matching-list relative flex flex-col">
      <MatchingListHeader text={'보낸 메시지'} background={'#252525'} />

      <div className="relative h-[calc(75vh)] overflow-y-scroll scrollbar-hide" ref={outerContainerRef} onScroll={calculateThumbY}>
      <ScrollBarThumb ref={thumbRef} height={thumbH} />

      <ItemContainer ref={innerContainerRef}>
      {sendedMessageProfileCard?.map((item, index) => (
            <SendedMessageItem key={index} {...item} />
          ))}

        </ItemContainer>
        </div>
        <Footer />
      </main>

    </Layout>
  )
}

export default SendedMessage