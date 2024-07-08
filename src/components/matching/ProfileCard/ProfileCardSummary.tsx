import { useEffect, useState } from 'react';
import ProfileImage from '@/components/matching/ProfileImage';
import Name from '@/components/common/Name';
import Comment from '@/components/matching/Comment';
import UnlockModal from '@/components/matching/UnlockModal';
import Spread from '@/components/matching/Spread';
import MusicCard from '@/components/common/MusicCard';
import BlankMusicCard from '@/components/matching/BlankMusicCard';
import CoupleMusic from '@/components/matching/CoupleMusic';
import useProfileCardStore from '@/store/profileCardStore';
import PostMessage from '@/components/matching/PostMessage';
import useGetRandomBackgrounds from '@/hooks/useGetRandomBackgrounds/useGetRandomBackgrounds';
import MusicCardContainer from '@/components/matching/MusicCardContainer';
import { CombinedProfileCardProps } from '@/type/ProfileCard/ProfileCard';
import Tag from '@/components/common/Tag';
import Fold from '@/components/matching/Fold';
import Divider from '@/components/common/Divider';
import UserTaste from '@/components/matching/UserTaste';

const ProfileCardSummary = ({ profileId, name, birthDate, mbti, oneLineIntroduction, distance, lifeMusics, selfIntroduction, 
   isOpen,isModalOpen,isLock,handleSetOpen ,handleSetModalOpen,activeIndex}: CombinedProfileCardProps) => {

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
  const currentBackground = useGetRandomBackgrounds({ backgrounds });

  console.log(`index : ${activeIndex} isLock: ${isLock} isOpen : ${isOpen} ,isModalOpen : ${isModalOpen}` )
  const ProfileCardStyle = ` ${!isOpen ? `h-auto pt-[30px] my-[calc((100vh-200px-340px)/2)] pb-[20px] mx-[3%] ${currentBackground}`
                               : `h-[130vh]  my-[calc((100vh-200px]} pt-[80px]`}
                              rounded-[16px] scrollbar-hide overflow-scroll 
                             `;

  // 메시지보내기 창 모달 오픈
  const { openMessage } = useProfileCardStore();
    

  
  return (
    <div className={ProfileCardStyle}>
      {isModalOpen && <UnlockModal
        // setLock={setLock}
        handleSetModalOpen={(activeIndex:number | undefined, value: boolean) => handleSetModalOpen?.(activeIndex, value)}
        handleSetOpen={(activeIndex:number | undefined,value: boolean) => handleSetOpen?.(activeIndex, value)}
        activeIndex={activeIndex}
        profileId={profileId}
        isOpen={isOpen}
      />}
      {/* Top */}
      {!isOpen &&
      <>
        <div className={`flex flex-row ml-6`}>
          <ProfileImage
            handleSetModalOpen={(activeIndex:number | undefined, value: boolean) => handleSetModalOpen?.(activeIndex, value)}
            handleSetOpen={(activeIndex:number | undefined,value: boolean) => handleSetOpen?.(activeIndex, value)}
            isLock={isLock}
            activeIndex={activeIndex}
            />

          {openMessage && <PostMessage />}
          <div className={`flex flex-col ml-[5%]`}>
            <Name name={name} birthDate={birthDate} mbti={mbti} />
            <Comment />

            {/* <div className='flex flex-wrap mb-[5px]'>
              {tags?.map((item) => (
                <Tag name={item.name} state={item.state} isProfileCard={true} />
              ))}
            </div>  */}

          </div>
        </div>
      
      <MusicCardContainer >
        {!isOpen &&
          <p data-testid='music' className={`text-[#2F2F2F] text-s ml-[6%] font-bold my-[8px]`}>
            인생곡 TOP 3
          </p>
        }
        {lifeMusics?.map((item) => (
          <MusicCard title={item.title} artist={item.artist} isProilfeCard={true} />
        ))}

      </MusicCardContainer>

      <BlankMusicCard />
      <Spread 
        handleSetModalOpen={(activeIndex:number | undefined,value: boolean) => handleSetModalOpen?.(activeIndex, value)}
        handleSetOpen={(activeIndex:number | undefined,value: boolean) => handleSetOpen?.(activeIndex, value)}
        isLock={isLock} 
        activeIndex={activeIndex}
        />

        </>
}

    </div>
  );
}

export default ProfileCardSummary;
