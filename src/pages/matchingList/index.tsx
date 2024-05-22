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
import { useState } from 'react';
import MatchingListHeader from '@/components/layout/matchingListHeader';


const MatchingListPage = () => {

  // 좋아요 / 메시지 토글  
  // 부모 컴포넌트에서 상태 관리
  const [selected, setSelected] = useState('heart');

  // 상태를 변경하는 함수
  const handleSelectToggle = (selectedValue: string) => {
    setSelected(selectedValue);
  }

  return (
    <Layout backgroundColor='#2C2C2C'>

      <div className="h-auto mt-[10vh] bg-matching-list relative flex flex-col rounded-t-[28px] pb-[130px]">
      <MatchingListHeader text={'matchingList'} background={'#2C2C2C'} />

        <SocialButtons onSelectedToggle={handleSelectToggle} selected={selected} />
        {/* 받은 하트 */}
        <ExpandedButtons heartState='받은 하트' router='receivedHeart' />
        <Divider />
        <ReceivedHeartContainer>
          {MOCK_RECEIVE_HEARTS.slice(0, 4).map((item, index) => (
            <ReceivedHeartItem key={index} {...item} />
          ))}

        </ReceivedHeartContainer>
        {/* 보낸하트 */}
        <ExpandedButtons heartState='보낸 하트' router='sendedHeart' />
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