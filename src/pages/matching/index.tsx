import { useState } from 'react';
import Image from '@/components/profileCard/profileImage';
import Name from '@/components/common/name';
import Comment from '@/components/profileCard/comment';
import UnlockModal from '@/components/profileCard/unlockModal';
import Spread from '@/components/profileCard/spread';
import Layout from '@/components/layout/layout';
import Footer from '@/components/layout/footer';
import ProfileCardHeader from '@/components/layout/profileCardheader';
import ProfileMusicCardTag from '@/components/profileCard/musicTag';
import ProfileHabitCardTag from '@/components/profileCard/habitTag';
import MusicCard from '@/components/profileCard/musicCard';
import BlankMusicCard from '@/components/profileCard/blankMusicCard';
import CoupleMusic from '@/components/profileCard/coupleMusic';
import Introduction from '@/components/profileCard/introduction';
import LikeMusic from '@/components/profileCard/likeMusic';
import Post from '@/components/profileCard/post';
import useProfileCardStore from '@/store/profileCardStore';
import PostMessage from '@/components/profileCard/postMessage';
import useGetRandomBackgrounds from '@/hooks/useGetRandomBackgrounds/useGetRandomBackgrounds';

const MatchingPage = () => {
  // 배경색 목록
  const backgrounds = [
    'bg-background-grey',
    'bg-background-yellow',
    'bg-background-green',
    'bg-background-kiwi',
    'bg-background-purple',
    'bg-background-pink',
    'bg-background-sky',
  ];

  const currentBackground = useGetRandomBackgrounds({backgrounds});

  // 잠금 상태
  const [isLock, setLock] = useState<boolean>(true);

  // 오픈 상태
  const [open, setOpen] = useState<boolean>(false);

  const Style = ` ${!open ? 'h-[400px] my-[calc((100vh-200px-400px)/2)]' : 'h-auto mt-[50px]'}
                             
                             mx-[8%] rounded-[16px] ${currentBackground} 
                             w-[calc(100%-16%)] py-[25px]
                             scrollbar-hide overflow-scroll
                             `;

  const topContainer = `flex flex-row ml-[10%] `;
  const Details = `flex flex-col ml-[6%]`;
  
  // 메시지보내기 창 모달 오픈
  const {openMessage} = useProfileCardStore();

  return (
    <Layout backgroundColor={'#252525'} display='header'>
    <ProfileCardHeader />
    <div className={Style}>

      {/* Top */}
      <div className={topContainer}>
        <Image setLock={setLock} />
        {!isLock && <UnlockModal setLock={setLock} setOpen={setOpen}/>}
        {openMessage && <PostMessage />}
        <div className={Details}>
          <Name />
          <Comment />
          <ProfileMusicCardTag />
          {open && <ProfileHabitCardTag /> }
          
        </div>
      </div>

      {/* Music Card */}
      <MusicCard />
      <MusicCard />
      <MusicCard />

      {!open && <BlankMusicCard />}
      {!open && <Spread setLock={setLock} />}

      {open && 
      <>
        <CoupleMusic />
        <Introduction />
        <LikeMusic />

      </>
        }
    </div>
    {open && <Post />}

    <Footer />
  </Layout>
  );
};

export default MatchingPage;
