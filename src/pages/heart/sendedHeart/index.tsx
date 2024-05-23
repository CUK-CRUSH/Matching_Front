import Layout from "@/components/layout/layout"
import Footer from '@/components/layout/footer';
import MatchingListHeader from "@/components/layout/matchingListHeader";
import ItemContainer from "@/components/matchingList/ItemContainer";
import { MOCK_RECEIVE_HEARTS } from "@/fixture/ReceiveHeart";
import SendedHeartItem from "@/components/matchingList/SendedHeartItem";

const SendedHeart = () => {
  return (
    <Layout backgroundColor='#252525'>
      <main className="min-h-full h-auto mt-[10vh] bg-matching-list relative flex flex-col pb-[100px]">

        <MatchingListHeader text={'보낸 하트'} background={'#252525'} />
        <ItemContainer>
          {MOCK_RECEIVE_HEARTS.map((item, index) => (
            <SendedHeartItem key={index} {...item} />
          ))}

        </ItemContainer>
        <Footer />
      </main>

    </Layout>
  )
}

export default SendedHeart