import Layout from "@/components/layout/layout"
import Footer from '@/components/layout/footer';
import MatchingListHeader from "@/components/layout/matchingListHeader";
import ItemContainer from "@/components/matchingList/ItemContainer";
import { MOCK_RECEIVE_HEARTS } from "@/fixture/ReceiveHeart";
import SendedItem from "@/components/matchingList/SendedItem";
import { useRef } from "react";
import useCustomScroll from "@/hooks/useCustomScrollBar/useCustomScrollBar";

const SendedHeart = () => {
  const outerContainerRef = useRef<HTMLDivElement | null>(null);
  const innerContainerRef = useRef<HTMLDivElement | null>(null);
  const { ScrollBarThumb, calculateThumbY, thumbH, thumbRef } = useCustomScroll(
    {
      outerContainerRef,
      innerContainerRef,
      outerContainerBorderWidth: 1
    }
  );
  return (
    <Layout backgroundColor='#252525'>
      <main className="min-h-full h-auto bg-matching-list relative flex flex-col pb-[100px]">

        <MatchingListHeader text={'보낸 하트'} background={'#252525'} />
        <div className="relative h-[calc(75vh)] overflow-y-scroll scrollbar-hide" ref={outerContainerRef} onScroll={calculateThumbY}>
          <ScrollBarThumb ref={thumbRef} height={thumbH} />

          <ItemContainer ref={innerContainerRef}>
            {MOCK_RECEIVE_HEARTS.map((item, index) => (
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