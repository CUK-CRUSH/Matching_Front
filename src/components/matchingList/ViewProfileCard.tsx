import ProfileImage from '@/components/matching/ProfileImage';
import Name from '@/components/common/Name'
import Comment from '@/components/matching/Comment';
import MusicCard from '@/components/common/MusicCard';
import useProfileCardStore from '@/store/profileCardStore';
import PostMessageModal from '@/components/matching/PostMessageModal';
import useGetRandomBackgrounds from '@/hooks/useGetRandomBackgrounds/useGetRandomBackgrounds';
import MusicCardContainer from '@/components/matching/MusicCardContainer';
import { ProfileCardProps } from '@/type/ProfileCard/ProfileCard';
import Tag from '@/components/common/Tag';
import { useEffect, useState } from 'react';
import { getProfileCardDetailData } from '@/services/ProfileCard/ProfileCardApi';
import Fold from '@/components/matching/Fold';
import UserTaste from '@/components/matching/UserTaste';
import MoodMusic from '@/components/matching/MoodMusic';
import SocialButtons from '@/components/matching/SocialButtons';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Layout from '../layout/layout';
import Footer from '../layout/footer';
import { useCookies } from 'react-cookie';

const ViewProfileCard = () => {
  const { profileId } = useParams<{ profileId: string }>();
  
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
  const ProfileCardStyle = `  rounded-[16px] pt-[30px] mt-[80px]'
                             mx-[3%]  ${currentBackground} 
                             w-[calc(100%-6%)]  
                             scrollbar-hide overflow-scroll 
                             `;

  // 메시지보내기 창 모달 오픈
  const { openMessage } = useProfileCardStore();

  //  단일조회하기 profileId 를 통해
  const { data: getProfileCardData, error } = useQuery({
    queryKey: ['recieveMessageProfileCardData'],
    queryFn: () => getProfileCardDetailData(accessToken,Number(profileId)),
    staleTime: 1000 * 60 * 5, // 5분
    placeholderData: (previousData) => previousData,
  });

  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  
  useEffect(() => {
      
      getProfileCardDetailData(accessToken,Number(profileId)).then((response) => {
        // 프로필 데이터 추가
        setProfiles(response?.data?.profileCardResponse);
      }
    );
    }, [profileId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!getProfileCardData) {
    return <div>Loading...</div>;
  }
  return (
    <Layout backgroundColor={'#252525'}>
      <div className='my-[40px]'/>
      <div className={ProfileCardStyle}>
       
        {/* Top */}

        <div className={`flex flex-row ml-6`}>
          <ProfileImage
            profileImageUrl={profiles?.profileImageUrl}
          />

          {openMessage && <PostMessageModal memberId={Number(profiles?.memberId)} />}

          <div className={`flex flex-col ml-[5%]`}>
            <Name name={profiles?.name} birthDate={profiles?.birthDate} mbti={profiles?.mbti} distance={profiles?.distance} isProfileCard={true} />
            <Comment oneLineIntroduction={profiles?.oneLineIntroduction} />

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

          </div>
        </div>

        <MusicCardContainer isOpen={true}>
          
            <p data-testid='music' className={`text-[#2F2F2F] text-s ml-[6%] font-bold my-[8px]`}>
              인생곡 TOP 3
            </p>
         
          {profiles?.lifeMusics?.map((item) => (
            <MusicCard title={item.title} artist={item.artist} isProilfeCard={true} />
          ))}

        </MusicCardContainer>


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
          <div>
            <Fold
              
            />
            {/* <Divider /> */}
          </div>
        </>

      </div>
      <SocialButtons profileId={Number(profileId)} />
      <Footer />

    </Layout>
  );
}

export default ViewProfileCard;
