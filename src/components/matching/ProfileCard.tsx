import { useState } from 'react';
import ProfileImage from '@/components/matching/ProfileImage';
import Name from '@/components/common/name';
import Comment from '@/components/matching/Comment';
import UnlockModal from '@/components/matching/UnlockModal';
import Spread from '@/components/matching/Spread';
import MusicCard from '@/components/common/MusicCard';
import BlankMusicCard from '@/components/matching/BlankMusicCard';
import CoupleMusic from '@/components/matching/CoupleMusic';
import Introduction from '@/components/matching/Introduction';
import LikeMusic from '@/components/matching/LikeMusic';
import SocialButtons from '@/components/matching/SocialButtons';
import useProfileCardStore from '@/store/profileCardStore';
import PostMessage from '@/components/matching/PostMessage';
import useGetRandomBackgrounds from '@/hooks/useGetRandomBackgrounds/useGetRandomBackgrounds';
import MusicCardContainer from '@/components/matching/MusicCardContainer';
import { ProfileCardProps } from '@/type/ProfileCard/ProfileCard';
import Tag from '@/components/matchingList/Tag';
import Fold from '@/components/matching/Fold';

const ProfileCard = ({name,age,mbti,tag,music,couple,introduce,likeMusic} : ProfileCardProps) => {
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

  // 잠금 상태
  const [isLock, setLock] = useState<boolean>(true);

  // 오픈 상태
  const [open, setOpen] = useState<boolean>(false);

  const Style = ` ${!open ? 'h-auto my-[calc((100vh-200px-340px)/2)]' : 'h-auto mt-[50px]'}
                             mx-[3%] rounded-[16px] ${currentBackground} 
                             w-[calc(100%-6%)] py-[30px] 
                             scrollbar-hide overflow-scroll 
                             `;

  // 메시지보내기 창 모달 오픈
  const { openMessage } = useProfileCardStore();
  return (
    <>
      <div className={Style}>

        {/* Top */}
        <div className={`flex flex-row ml-6`}>
          <ProfileImage setOpen={setOpen} isOpen={open} />
          {!isLock  && <UnlockModal setLock={setLock} setOpen={setOpen} />}
          {openMessage && <PostMessage />}
          <div className={`flex flex-col ml-[5%]`}>
            <Name name={name} age={age} mbti={mbti} />
            <Comment />

            {/* 음악취향 */}
            <div className='flex flex-wrap mb-[5px]'>
            {tag.map((item) => (
              <Tag tag={item} isProfileCard={true} />
            ))}
            </div>

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
          {music.map((item) => (
            <MusicCard song={item.song} artist={item.artist} isProilfeCard={true} />
          ))}

        </MusicCardContainer>

        {!open && <BlankMusicCard />}
        {!open && <Spread setOpen={setOpen} />}

        {open &&
          <>
            <CoupleMusic song={couple.song} artist={couple.artist} />
            <Introduction introduce={introduce} />
            <LikeMusic likeMusic={likeMusic} />
            <Fold setOpen={setOpen}/>
          </>
        }
      </div>
      {open && <SocialButtons />}
    </>
  );
}

export default ProfileCard;