import Layout from '@/components/layout/layout';
import Footer from '@/components/layout/footer';
import SocialButtons from '@/components/matchingList/SocialButtons';


const MatchingListPage = () => {
  return (
    <Layout backgroundColor='#2C2C2C'>
      <div className="h-[90vh] mt-[10vh] bg-matching-list relative flex justify-center items-center rounded-t-[28px]">
        <SocialButtons />
      </div>

      <Footer />
    </Layout>
  )
}

export default MatchingListPage