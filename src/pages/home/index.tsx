import ProfileCard from '@/components/ui/profileCard';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import Layout from '@/components/layout/layout';

export default function Home() {
  return (
    <Layout display="both">
      <Header />
      <ProfileCard />
      <Footer />
    </Layout>
  );
}
