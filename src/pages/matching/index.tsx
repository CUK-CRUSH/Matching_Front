import React, { useState, useEffect } from 'react';
import ProfileCardImage from '@/components/profileCard/profileCardImage';
import ProfileCardName from '@/components/profileCard/profileCardName';
import ProfileCardComment from '@/components/profileCard/profileCardComment';
import UnlockModal from '@/components/profileCard/unlockModal';
import SpreadProfileCard from '@/components/profileCard/spreadProfileCard';
import Layout from '@/components/layout/layout';
import Footer from '@/components/layout/footer';
import ProfileCardHeader from '@/components/layout/profileCardheader';
import ProfileMusicCardTag from '@/components/profileCard/profileCardMusicTag';
import ProfileHabitCardTag from '@/components/profileCard/profileCardHabitTag';
import ProfileCardMusicCard from '@/components/profileCard/profileCardMusicCard';
import ProfileCardBlankMusicCard from '@/components/profileCard/profileCardBlankMusicCard';
import ProfileCardCoupleMusic from '@/components/profileCard/profileCardCoupleMusic';
import ProfileCardIntroduction from '@/components/profileCard/profileCardIntroduction';
import ProfileCardLikeMusic from '@/components/profileCard/profileCardLikeMusic';

const MatchingPage: React.FC = () => {
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
  const [previousBackground, setPreviousBackground] = useState('');
  const [currentBackground, setCurrentBackground] = useState('');

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

  const profileCardStyle = ` ${!open ? 'h-[400px] my-[calc((100vh-200px-400px)/2)]' : 'h-[100vh] my-[40px] mb-[140px]'}
                             mx-[8%] rounded-[16px] ${currentBackground} 
                             w-[calc(100%-16%)]
                             `;

  const topProfileCardContainer = `flex flex-row ml-[10%] pt-[25px]`;
  const profileCardDetails = `flex flex-col ml-[6%]`;
  
  return (
    <Layout backgroundColor={'#252525'}>
    <ProfileCardHeader />
    <div className={profileCardStyle}>

      {/* Top */}
      <div className={topProfileCardContainer}>
        <ProfileCardImage setLock={setLock} />
        {!isLock && <UnlockModal setLock={setLock} setOpen={setOpen}/>}
        <div className={profileCardDetails}>
          <ProfileCardName />
          <ProfileCardComment />
          <ProfileMusicCardTag />
          {open && <ProfileHabitCardTag /> }
          
        </div>
      </div>

      {/* Music Card */}
      <ProfileCardMusicCard />

      {!open && <ProfileCardBlankMusicCard />}
      {!open && <SpreadProfileCard setLock={setLock} />}

      {open && 
      <>
        <ProfileCardCoupleMusic />
        <ProfileCardIntroduction />
        <ProfileCardLikeMusic />
      </>
        }
    </div>
    <Footer />
  </Layout>
  );
};

export default MatchingPage;
