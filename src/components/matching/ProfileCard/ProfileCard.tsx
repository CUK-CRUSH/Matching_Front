import ProfileImage from '@/components/matching/ProfileImage';
import Name from '@/components/common/Name';
import Comment from '@/components/matching/Comment';
import Spread from '@/components/matching/Spread';
import MusicCard from '@/components/common/MusicCard';
import BlankMusicCard from '@/components/matching/BlankMusicCard';
import useProfileCardStore from '@/store/profileCardStore';
import useGetRandomBackgrounds from '@/hooks/useGetRandomBackgrounds/useGetRandomBackgrounds';
import MusicCardContainer from '@/components/matching/MusicCardContainer';
import { CombinedProfileCardProps, ProfileCardProps } from '@/type/ProfileCard/ProfileCard';
import Tag from '@/components/common/Tag';
import { useEffect, useState } from 'react';
import { spendCoin } from '@/services/ProfileCard/ProfileCardApi';
import { toast } from '@/components/ui/use-toast';
import Fold from '../Fold';
import UserTaste from '@/components/matching/UserTaste';
import MoodMusic from '@/components/matching/MoodMusic';
import SocialButtons from '../SocialButtons';
import { useCookies } from 'react-cookie';

const ProfileCard = ({
  profileId,
  name,
  birthDate,
  mbti,
  tags,
  oneLineIntroduction,
  distance,
  lifeMusics,
  isOpen,
  isLock,
  handleSetOpen,
  handleSetModalOpen,
  handleSetLockOpen,
  activeIndex,
  setIsUnfilledModalOpen,
  setIsUnlockModalOpen,
  isUnlockModalOpen,
}: CombinedProfileCardProps) => {
  // 프로필 데이터
  const [profiles, setProfiles] = useState<ProfileCardProps | undefined>();

  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const { setIsYoutubeModalOpen } = useProfileCardStore();

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
  const ProfileCardStyle = ` ${!isOpen ? 'relative h-auto my-[calc((100vh-200px-340px)/2)] pb-[20px]' : 'h-auto rounded-[16px] pt-[30px] mt-[80px] '}
                                mx-[3%] rounded-[16px] ${currentBackground} 
                                w-[calc(100%-6%)] pt-[30px] 
                                scrollbar-hide overflow-scroll 
                                `;

  // 메시지보내기 창 모달 오픈
  const { ableSpend, setAbleSpend, index, setMemberId } = useProfileCardStore();

  // 멤버아이디 저장
  useEffect(() => {
    setMemberId(profiles?.memberId);
  }, [profiles]);

  useEffect(() => {
    if (ableSpend && isUnlockModalOpen && index === profileId) {
      spendCoin(accessToken, profileId)
        .then((response) => {
          setProfiles(response?.data?.profileCardResponse);
          handleSetOpen?.(activeIndex, true);
          handleSetLockOpen?.(activeIndex, false);
          setAbleSpend(false); // 상태를 false로 설정하여 반복 실행 방지
          setIsUnlockModalOpen?.(false);
          toast({
            title: '잠금 해제 완료!',
            className:
              'h-[40px] w-[90%] bg-[#252525] text-[#fff] fixed top-[60px] left-1/2 transform -translate-x-1/2 flex justify-center border-0 exceed:w-[358px]',
          });
        })
        .catch((error) => {
          // 에러 메시지
          alert(error.message);
          handleSetOpen?.(activeIndex, false);
          setAbleSpend(false); // 오류 발생 시에도 상태를 false로 설정

          console.error('Error spending coin:', error);
          // 에러 처리
        });
    }
  }, [ableSpend]);

  return (
    <>
      <div className={ProfileCardStyle}>
        {/* Top */}

        <div className={`flex flex-row ml-6`}>
          <ProfileImage
            handleSetModalOpen={(activeIndex: number | undefined, value: boolean) =>
              handleSetModalOpen?.(activeIndex, value)
            }
            handleSetOpen={(activeIndex: number | undefined, value: boolean) =>
              handleSetOpen?.(activeIndex, value)
            }
            setIsUnfilledModalOpen={setIsUnfilledModalOpen}
            setIsUnlockModalOpen={setIsUnlockModalOpen}
            isLock={isLock}
            activeIndex={activeIndex}
            profileImageUrl={profiles?.profileImageUrl}
          />

          <div className={`flex flex-col ml-[5%]`}>
            <Name
              name={name}
              birthDate={birthDate}
              mbti={mbti}
              distance={distance}
              isProfileCard={true}
            />
            <Comment oneLineIntroduction={oneLineIntroduction} />
            {!isOpen ? (
              <div className="flex flex-wrap mb-[5px]">
                {tags?.map((item) => (
                  <Tag name={item.name} state={item.state} isProfileCard={true} />
                ))}
              </div>
            ) : (
              <>
                <div className="flex flex-wrap mb-[5px]">
                  {profiles?.musicTags?.map((item) => (
                    <Tag name={item.name} state={item.state} isProfileCard={true} mark={true} />
                  ))}
                </div>

                {/* 취미취향 */}
                <div className="flex flex-wrap mb-[5px]">
                  {profiles?.hobbyTags?.map((item) => (
                    <Tag name={item.name} state={item.state} isProfileCard={true} mark={true} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <MusicCardContainer isOpen={isOpen}>
          {isOpen && (
            <p data-testid="music" className={`text-[#2F2F2F] text-s ml-[6%] font-bold my-[8px]`}>
              인생곡 TOP 3
            </p>
          )}
          {lifeMusics?.map((item) => (
            <MusicCard
              title={item.title}
              artist={item.artist}
              videoId={item.videoId}
              isOpen={isOpen}
              isProilfeCard={true}
              setIsYoutubeModalOpen={setIsYoutubeModalOpen}
            />
          ))}
        </MusicCardContainer>
        {!isOpen ? (
          <>
            <BlankMusicCard />
            <Spread
              handleSetModalOpen={(activeIndex: number | undefined, value: boolean) =>
                handleSetModalOpen?.(activeIndex, value)
              }
              handleSetOpen={(activeIndex: number | undefined, value: boolean) =>
                handleSetOpen?.(activeIndex, value)
              }
              setIsUnfilledModalOpen={setIsUnfilledModalOpen}
              setIsUnlockModalOpen={setIsUnlockModalOpen}
              isLock={isLock}
              activeIndex={activeIndex}
            />
          </>
        ) : (
          <>
            <MoodMusic
              title={profiles?.mood?.title}
              artist={profiles?.mood?.artist}
              moodImageUrl={profiles?.mood?.moodImageUrl}
            />
            <UserTaste
              title="스스로를 소개해주세요"
              value={profiles?.selfIntroduction}
              testId="introduction"
            />
            <UserTaste
              title="어떤 음악취향을 가진 상대에게 호감을 느끼나요 ?"
              value={profiles?.likeableMusicTaste}
              testId="likeMusic"
            />
            <div>
              <Fold
                handleSetOpen={(activeIndex: number | undefined, value: boolean) =>
                  handleSetOpen?.(activeIndex, value)
                }
                handleSetModalOpen={(activeIndex: number | undefined, value: boolean) =>
                  handleSetModalOpen?.(activeIndex, value)
                }
                activeIndex={activeIndex}
              />
              {/* <Divider /> */}
            </div>
          </>
        )}
      </div>
      {isOpen && <SocialButtons profileId={profileId} likeState={profiles?.likeState} />}
    </>
  );
};

export default ProfileCard;
