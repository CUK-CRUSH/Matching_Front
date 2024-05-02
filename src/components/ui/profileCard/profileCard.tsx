import React, { useState, useEffect } from 'react';
import ProfileCardImage from '@/components/ui/profileCard/profileCardImage'
import ProfileCardName from '@/components/ui/profileCard/profileCardName';
import ProfileCardComment from '@/components/ui/profileCard/profileCardComment';
import ProfileCardTag from '@/components/ui/profileCard/profileCardTag';
import UnlockModal from '@/components/ui/profileCard/unlockModal';
import SpreadProfileCard from '@/components/ui/profileCard/spreadProfileCard';

const ProfileCard: React.FC = () => {
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
    const newBackgrounds = backgrounds.filter(bg => bg !== previousBackground);

    // 새로운 배경색 목록에서 랜덤으로 하나 선택
    const randomBackground = newBackgrounds[Math.floor(Math.random() * newBackgrounds.length)];

    // 현재 배경색을 업데이트하고, 이전 배경색 상태도 업데이트
    setCurrentBackground(randomBackground);
    setPreviousBackground(currentBackground);
  }, [previousBackground]);
  
  // 잠금 상태
  const [isLock, setLock] = useState<boolean>(true);
  
  // 오픈 상태
  const [open] = useState<boolean>(false);
  
  const profileCardStyle = ` ${!open ? 'h-[360px] my-[calc((100vh-200px-360px)/2)]' : 'h-[100vh]'}
                             mx-[4%] rounded-[16px] ${currentBackground} 
                             w-[calc(100%-8%)]
                             after:content-[''] after:absolute after:h-[50%] after:bg-[linear-gradient(to_top,rgba(0,0,0,0.1),transparent)]     
                             `;

  const topProfileCardContainer = `flex flex-row ml-[10%] pt-[25px]`;
  const profileCardDetails = `flex flex-col ml-[6%]`;
  return (
    <div className={profileCardStyle} >

      <div className={topProfileCardContainer}>
      <ProfileCardImage setLock={setLock}/>
      {!isLock && <UnlockModal setLock={setLock}/> }
      <div className={profileCardDetails}>
      <ProfileCardName />
      <ProfileCardComment />
      {/* </div> */}

      <ProfileCardTag />
      </div>
      </div>
      <SpreadProfileCard setLock={setLock}/> 
    </div>
  );
};

export default ProfileCard;
