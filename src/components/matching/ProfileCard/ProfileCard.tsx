import { useState } from 'react';
import ProfileImage from '@/components/matching/ProfileImage';
import Name from '@/components/common/Name';
import Comment from '@/components/matching/Comment';
import UnlockModal from '@/components/matching/UnlockModal';
import Spread from '@/components/matching/Spread';
import MusicCard from '@/components/common/MusicCard';
import BlankMusicCard from '@/components/matching/BlankMusicCard';
import CoupleMusic from '@/components/matching/CoupleMusic';
import SocialButtons from '@/components/matching/SocialButtons';
import useProfileCardStore from '@/store/profileCardStore';
import PostMessage from '@/components/matching/PostMessage';
import useGetRandomBackgrounds from '@/hooks/useGetRandomBackgrounds/useGetRandomBackgrounds';
import MusicCardContainer from '@/components/matching/MusicCardContainer';
import { CombinedProfileCardProps } from '@/type/ProfileCard/ProfileCard';
import Tag from '@/components/common/Tag';
import Fold from '@/components/matching/Fold';
import Divider from '@/components/common/Divider';
import UserTaste from '@/components/matching/UserTaste';

const ProfileCard = ({ profileId, name, birthDate, mbti,oneLineIntroduction,distance,lifeMusics,selfIntroduction, likeableMusicTaste,musicTags,hobbyTags,
  handleSetModalOpen,handleSetOpen,activeIndex,currentBackground,isOpen}: CombinedProfileCardProps) => {


  // 잠금 상태
  const [isLock, setLock] = useState<boolean>(true);

  // 모달 오픈 상태
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  // console.log(`isLock: ${isLock} isOpen : ${isOpen} ,isOpenModal : ${isOpenModal}` )
  const ProfileCardStyle = ` h-[auto]  pb-[8px]
                             rounded-[16px] ${currentBackground} 
                             w-[calc(100%-6%)] pt-[30px] 
                             scrollbar-hide overflow-scroll 
                             `;

  // 메시지보내기 창 모달 오픈
  const { openMessage } = useProfileCardStore();
  
    return (

    <>
      <div className={ProfileCardStyle}>

        {/* Top */}
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
            <Comment oneLineIntroduction={oneLineIntroduction} />

            {/* 음악취향 */}
            {/* <div className='flex flex-wrap mb-[5px]'>
              {tags?.map((item) => (
                <Tag tag={item} isProfileCard={true} />
              ))}
            </div> */}

            {/* 취미취향 */}
            {/* {open && 
            <div className='flex flex-wrap mb-[5px]'>
            {tag.map((item) => (
              <Tag tag={item} isProfileCard={true} />
            ))}
            </div>} */}

          </div>
        </div>

        {/* Music Card */}
        <MusicCardContainer >
          {isOpen &&
            <p data-testid='music' className={`text-[#2F2F2F] text-s ml-[6%] font-bold my-[8px]`}>
              인생곡 TOP 3
            </p>
          }
           {lifeMusics?.map((item) => (
            <MusicCard title={item.title} artist={item.artist} isProilfeCard={true} />
          ))}

        </MusicCardContainer>

       
        
          <>
            {/* <CoupleMusic song={couple.song} artist={couple.artist} /> */}
            <UserTaste 
              title="스스로를 소개해주세요"
              value={selfIntroduction}
              testId="introduction" />
            <UserTaste 
              title="어떤 음악취향을 가진 상대에게 호감을 느끼나요 ?"
              value={likeableMusicTaste}
              testId="likeMusic" />
            <div className={` bg-yellow-250`}>
              <Fold         handleSetOpen={(activeIndex:number | undefined,value: boolean) => handleSetOpen?.(activeIndex, value)}
 />
              <Divider />
            </div>
          </>
          
      </div>
      {isOpen && <SocialButtons />}
    </>
  );
}

export default ProfileCard;
