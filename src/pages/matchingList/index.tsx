import Layout from '@/components/layout/layout';
import Footer from '@/components/layout/footer';
import SocialButtons from '@/components/matchingList/SocialButtons';
import ExpandedButtons from '@/components/matchingList/ExpandedButtons';


const MatchingListPage = () => {
  return (
    <Layout backgroundColor='#2C2C2C'>
      <div className="h-[90vh] mt-[10vh] bg-matching-list relative flex flex-col rounded-t-[28px]">
        <SocialButtons />
        {/* 받은 하트 */}
        <ExpandedButtons heartState='받은 하트' router='receive'/>
        
        {/* 보낸하트 */}
        <ExpandedButtons heartState='보낸 하트' router='send'/>
      </div>

      <Footer />
    </Layout>
  )
}

export default MatchingListPage