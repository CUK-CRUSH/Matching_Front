import Layout from "@/components/layout/layout";
import ProfileCard from "@/components/matching/ProfileCard";
import Footer from '@/components/layout/footer';
import { MOCK_PROFILECARD } from "@/fixture/ProfileCard";

const MatchingPage = () => {

  return (
    <Layout backgroundColor={'#252525'} display='header'>
       {MOCK_PROFILECARD.slice(0, 3).map((item, index) => (
                <ProfileCard {...item} />
              ))}
      
      <Footer />
    </Layout>
  );
};

export default MatchingPage;
