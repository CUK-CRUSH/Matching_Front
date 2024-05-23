import Layout from "@/components/layout/layout"
import Footer from '@/components/layout/footer';
import MatchingListHeader from "@/components/layout/matchingListHeader";
import ReceivedHeartContainer from "@/components/matchingList/ItemContainer";
import { MOCK_RECEIVE_HEARTS } from "@/fixture/ReceiveHeart";
import ReceivedHeartItem from "@/components/matchingList/ReceivedItem";

const ReceivedHeart = () => {
  return (
    <Layout backgroundColor='#252525'>
      <main className="min-h-full h-auto mt-[10vh] bg-matching-list relative flex flex-col pb-[100px]">

        <MatchingListHeader text={'받은 하트'} background={'#252525'}  />
        <ReceivedHeartContainer>
          {MOCK_RECEIVE_HEARTS.map((item, index) => (
            <ReceivedHeartItem key={index} {...item} />
          ))}

        </ReceivedHeartContainer>
        <Footer />
      </main>

    </Layout>
  )
}

export default ReceivedHeart