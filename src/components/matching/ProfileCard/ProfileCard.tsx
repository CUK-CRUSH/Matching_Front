import ProfileImage from '@/components/matching/ProfileImage';
import Name from '@/components/common/Name';
import Comment from '@/components/matching/Comment';
import UnlockModal from '@/components/matching/UnlockModal';
import Spread from '@/components/matching/Spread';
import MusicCard from '@/components/common/MusicCard';
import BlankMusicCard from '@/components/matching/BlankMusicCard';
import useProfileCardStore from '@/store/profileCardStore';
import PostMessage from '@/components/matching/PostMessage';
import useGetRandomBackgrounds from '@/hooks/useGetRandomBackgrounds/useGetRandomBackgrounds';
import MusicCardContainer from '@/components/matching/MusicCardContainer';
import { CombinedProfileCardProps, ProfileCardProps } from '@/type/ProfileCard/ProfileCard';
import Tag from '@/components/common/Tag';
import { useEffect, useState } from 'react';
import { getProfileCardDetailData, spendCoin } from '@/services/ProfileCard/ProfileCardApi';
import { toast } from "@/components/ui/use-toast"
import Fold from '../Fold';
import { Divider } from '@mui/material';
import UserTaste from '@/components/matching/UserTaste';
import MoodMusic from '@/components/matching/MoodMusic';

const ProfileCard = ({ profileId, name, birthDate, mbti, tags, oneLineIntroduction, distance, lifeMusics, 
  isOpen, isModalOpen, isLock, handleSetOpen, handleSetModalOpen, handleSetLockOpen, activeIndex }: CombinedProfileCardProps) => {

  // 프로필 데이터
  const [profiles, setProfiles] = useState<ProfileCardProps | undefined>();

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

  // console.log(`index : ${activeIndex} isLock: ${isLock} isOpen : ${isOpen} ,isModalOpen : ${isModalOpen}`)
  const ProfileCardStyle = ` ${!isOpen ? 'h-auto my-[calc((100vh-200px-340px)/2)] pb-[20px]' : 'h-auto rounded-[16px] pt-[30px] my-[80px]'}
                             mx-[3%] rounded-[16px] ${currentBackground} 
                             w-[calc(100%-6%)] pt-[30px] 
                             scrollbar-hide overflow-scroll 
                             `;

  // 메시지보내기 창 모달 오픈
  const { openMessage, ableSpend,setAbleSpend} = useProfileCardStore();

  useEffect(() => {
    ableSpend && spendCoin(profileId) 
      .then((response) => {
        setProfiles(response?.data?.profileCardResponse);
        setAbleSpend(false)
        console.log(profiles)
        toast({
          title: "잠금해제 완료!",
          className: 'h-[40px] w-[90%] bg-[#252525] text-[#fff] fixed top-[60px] left-1/2 transform -translate-x-1/2 flex justify-center border-0 exceed:w-[358px]'
        });
      })
      .catch((error) => {
        console.error('Error spending coin:', error);
        // 에러 처리
      });
  }, [isOpen]);
  console.log(profiles)

  return (
    <div className={ProfileCardStyle}>
      {isModalOpen && <UnlockModal
        // setLock={setLock}
        handleSetModalOpen={(activeIndex: number | undefined, value: boolean) => handleSetModalOpen?.(activeIndex, value)}
        handleSetOpen={(activeIndex: number | undefined, value: boolean) => handleSetOpen?.(activeIndex, value)}
        handleSetLockOpen={(activeIndex: number | undefined, value: boolean) => handleSetLockOpen?.(activeIndex, value)}
        activeIndex={activeIndex}
        profileId={profileId}
        isOpen={isOpen}
        currentBackground={currentBackground}
      />}
      {/* Top */}

      <div className={`flex flex-row ml-6`}>
        <ProfileImage
          handleSetModalOpen={(activeIndex: number | undefined, value: boolean) => handleSetModalOpen?.(activeIndex, value)}
          handleSetOpen={(activeIndex: number | undefined, value: boolean) => handleSetOpen?.(activeIndex, value)}
          isLock={isLock}
          activeIndex={activeIndex}
          profileImageUrl={profiles?.profileImageUrl}
        />

        {openMessage && <PostMessage />}

        <div className={`flex flex-col ml-[5%]`}>
          <Name name={name} birthDate={birthDate} mbti={mbti} distance={distance} isProfileCard={true} />
          <Comment oneLineIntroduction={oneLineIntroduction} />
          {!isOpen ?
            <div className='flex flex-wrap mb-[5px]'>
              {tags?.map((item) => (
                <Tag name={item.name} state={item.state} isProfileCard={true} />
              ))}
            </div>
            :
            <>
              <div className='flex flex-wrap mb-[5px]'>
              {profiles?.musicTags?.map((item) => (
                <Tag name={item.name} state={item.state} isProfileCard={true} mark={true} />
              ))}
            </div>

            {/* 취미취향 */}
            <div className='flex flex-wrap mb-[5px]'>
              {profiles?.hobbyTags?.map((item) => (
                <Tag name={item.name} state={item.state} isProfileCard={true} mark={true} />
              ))}
            </div>
            </>

          }
        </div>
      </div>

      <MusicCardContainer>
        {lifeMusics?.map((item) => (
          <MusicCard title={item.title} artist={item.artist} isProilfeCard={true} />
        ))}

      </MusicCardContainer>
      {!isOpen ?
        <>
          <BlankMusicCard />
          <Spread
            handleSetModalOpen={(activeIndex: number | undefined, value: boolean) => handleSetModalOpen?.(activeIndex, value)}
            handleSetOpen={(activeIndex: number | undefined, value: boolean) => handleSetOpen?.(activeIndex, value)}
            isLock={isLock}
            activeIndex={activeIndex}
          />
        </>
        :

        <>
        
          <MoodMusic title={profiles?.mood?.title} artist={profiles?.mood?.artist} moodImageUrl={profiles?.mood?.moodImageUrl} />
          <UserTaste
            title="스스로를 소개해주세요"
            value={profiles?.selfIntroduction}
            testId="introduction" />
          <UserTaste
            title="어떤 음악취향을 가진 상대에게 호감을 느끼나요 ?"
            value={profiles?.likeableMusicTaste}
            testId="likeMusic" />
          <div className={` bg-yellow-250`}>
            <Fold
              handleSetOpen={(activeIndex: number | undefined, value: boolean) => handleSetOpen?.(activeIndex, value)}
              handleSetModalOpen={(activeIndex: number | undefined, value: boolean) => handleSetModalOpen?.(activeIndex, value)}
              activeIndex={activeIndex}
            />
            {/* <Divider /> */}
          </div>
        </>
      }
    </div>
  );
}

export default ProfileCard;
