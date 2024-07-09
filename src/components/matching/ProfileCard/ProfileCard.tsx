import ProfileImage from '@/components/matching/ProfileImage';
import Name from '@/components/common/Name';
import Comment from '@/components/matching/Comment';
import MusicCard from '@/components/common/MusicCard';
import CoupleMusic from '@/components/matching/CoupleMusic';
import SocialButtons from '@/components/matching/SocialButtons';
import useProfileCardStore from '@/store/profileCardStore';
import PostMessage from '@/components/matching/PostMessage';
import MusicCardContainer from '@/components/matching/MusicCardContainer';
import { CombinedProfileCardProps } from '@/type/ProfileCard/ProfileCard';
import Fold from '@/components/matching/Fold';
import UserTaste from '@/components/matching/UserTaste';
import Tag from '@/components/common/Tag';
import { useEffect, useState } from 'react';
import { getProfileCardDetailData, spendCoin } from '@/services/ProfileCard/ProfileCardApi';
import { toast } from "@/components/ui/use-toast"
import { ProfileCardProps, UnlockModalProps } from '@/type/ProfileCard/ProfileCard';

const ProfileCard = ({ profileId,handleSetModalOpen, handleSetOpen, activeIndex, currentBackground, isOpen,isLock,coin }: CombinedProfileCardProps) => {
  
    const [profiles, setProfiles] = useState<ProfileCardProps | undefined>();

    useEffect(() => {
        coin ? spendCoin(profileId) :  getProfileCardDetailData(profileId)

          .then((response) => {
            setProfiles(response?.data?.profileCardResponse);
            console.log(profiles);
    
            toast({
              title: "잠금해제 완료!",
              className: 'h-[40px] w-[90%] bg-[#252525] text-[#fff] fixed top-[60px] left-1/2 transform -translate-x-1/2 flex justify-center border-0 exceed:w-[358px]'
            });
          })
          .catch((error) => {
            console.error('Error spending coin:', error);
            // 에러 처리
          });
    }, []);
  // 메시지보내기 창 모달 오픈
  const { openMessage } = useProfileCardStore();
  return (

    <div className='flex flex-col w-[calc(100%-6%)]'>
      <div className={`h-auto rounded-[16px] ${currentBackground} pt-[30px] scrollbar-hide overflow-scroll`}>

        {/* Top */}
        <div className={`flex flex-row ml-6`}>
          <ProfileImage
            handleSetModalOpen={(activeIndex: number | undefined, value: boolean) => handleSetModalOpen?.(activeIndex, value)}
            handleSetOpen={(activeIndex: number | undefined, value: boolean) => handleSetOpen?.(activeIndex, value)}
            activeIndex={activeIndex}
            profileImageUrl={profiles?.profileImageUrl}
          />


          {openMessage && <PostMessage />}
          <div className={`flex flex-col ml-[5%]`}>
            <Name name={profiles?.name} birthDate={profiles?.birthDate} mbti={profiles?.mbti} distance={profiles?.distance} isProfileCard={true} />
            <Comment oneLineIntroduction={profiles?.oneLineIntroduction} />

            {/* 음악취향 */}
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

          </div>
        </div>

        {/* Music Card */}
        <MusicCardContainer >

          <p data-testid='music' className={`text-[#2F2F2F] text-s ml-[6%] font-bold my-[8px]`}>
            인생곡 TOP 3
          </p>

          {profiles?.lifeMusics?.map((item) => (
            <MusicCard title={item.title} artist={item.artist} isProilfeCard={true} />
          ))}

        </MusicCardContainer>

        <>
          {/* <CoupleMusic song={couple.song} artist={couple.artist} /> */}
          <UserTaste
            title="스스로를 소개해주세요"
            value={profiles?.selfIntroduction}
            testId="introduction" />
          <UserTaste
            title="어떤 음악취향을 가진 상대에게 호감을 느끼나요 ?"
            value={profiles?.likeableMusicTaste}
            testId="likeMusic" />
          <div className={` w-full`}>
            <Fold
              handleSetOpen={(activeIndex: number | undefined, value: boolean) => handleSetOpen?.(activeIndex, value)}
              handleSetModalOpen={(activeIndex: number | undefined, value: boolean) => handleSetModalOpen?.(activeIndex, value)}
              activeIndex={activeIndex}
            />
          </div>
        </>

      </div>
      {<SocialButtons  />}
    </div>
  );
}

export default ProfileCard;
