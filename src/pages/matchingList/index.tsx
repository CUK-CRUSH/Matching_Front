import Layout from '@/components/layout/layout';
import Footer from '@/components/layout/footer';
import SocialButtons from '@/components/matchingList/SocialButtons';
import ExpandedButtons from '@/components/matchingList/ExpandedButtons';
import Divider from '@/components/matchingList/Divider';
import ReceivedHeartContainer from '@/components/matchingList/ReceivedHeartContainer';
import ReceivedHeartItem from '@/components/matchingList/ReceivedHeartItem';
import { MOCK_RECEIVE_HEARTS } from '@/fixture/ReceiveHeart';
import SendedHeartContainer from '@/components/matchingList/SendedHeartContainer';
import SendedHeartItem from '@/components/matchingList/SendedHeartItem';


const MatchingListPage = () => {
  return (
    <Layout backgroundColor='#2C2C2C'>
      <div className="h-auto mt-[10vh] bg-matching-list relative flex flex-col rounded-t-[28px] pb-[130px]">
        <SocialButtons />
        {/* 받은 하트 */}
        <ExpandedButtons heartState='받은 하트' router='receive' />
        <Divider />
        <ReceivedHeartContainer>
          {MOCK_RECEIVE_HEARTS.slice(0, 4).map((item, index) => (
            <ReceivedHeartItem key={index} {...item} />
          ))}

        </ReceivedHeartContainer>
        {/* 보낸하트 */}
        <ExpandedButtons heartState='보낸 하트' router='send' />
        <Divider />
        <SendedHeartContainer>
        {MOCK_RECEIVE_HEARTS.slice(0, 3).map((item, index) => (
            <SendedHeartItem key={index} {...item} />
          ))}
        </SendedHeartContainer>
      </div>

      <Footer />
    </Layout>
  )
}

export default MatchingListPage