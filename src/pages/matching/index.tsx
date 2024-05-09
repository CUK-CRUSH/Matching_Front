import { useState, useEffect } from 'react';
import Image from '@/components/profileCard/profileImage';
import Name from '@/components/profileCard/name';
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

const MatchingPage = () => {
  // 배경색 목록
  const backgrounds = [
    'bg-background-white',
    'bg-background-grey',
    'bg-background-yellow',
    'bg-background-green',
    'bg-background-kiwi',
    'bg-background-purple',
    'bg-background-pink',
    'bg-background-sky',
  ];

  // 이전 배경색 상태와 현재 배경색 상태
  const [previousBackground, setPreviousBackground] = useState<string>('');
  const [currentBackground, setCurrentBackground] = useState<string>('');

  // 컴포넌트 마운트 시 또는 이전 배경색이 변경될 때 실행
  useEffect(() => {
    // 이전 배경색을 제외한 새로운 배경색 목록 생성
    const newBackgrounds = backgrounds.filter((bg) => bg !== previousBackground);

    // 새로운 배경색 목록에서 랜덤으로 하나 선택
    const randomBackground = newBackgrounds[Math.floor(Math.random() * newBackgrounds.length)];

    // 현재 배경색을 업데이트하고, 이전 배경색 상태도 업데이트
    setCurrentBackground(randomBackground);
    setPreviousBackground(currentBackground);
  }, [previousBackground]);

  // 잠금 상태
  const [isLock, setLock] = useState<boolean>(true);

  // 오픈 상태
  const [open, setOpen] = useState<boolean>(false);

  const Style = ` ${!open ? 'h-[400px] my-[calc((100vh-200px-400px)/2)]' : 'h-auto '}
                             
                             mx-[8%] rounded-[16px] ${currentBackground} 
                             w-[calc(100%-16%)] py-[25px]
                             scrollbar-hide overflow-scroll
                             `;

  const topContainer = `flex flex-row ml-[10%] `;
  const Details = `flex flex-col ml-[6%]`;
  
  return (
    <Layout backgroundColor={'#252525'} display='header'>
    <ProfileCardHeader />
    <div className={Style}>

      {/* Top */}
      <div className={topContainer}>
        <Image setLock={setLock} />
        {!isLock && <UnlockModal setLock={setLock} setOpen={setOpen}/>}
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
