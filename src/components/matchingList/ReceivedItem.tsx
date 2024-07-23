import { ItemProps } from "@/type/MatchingList/MatchingList";
import useGetRandomBackgrounds from "@/hooks/useGetRandomBackgrounds/useGetRandomBackgrounds";
import Name from "@/components/common/Name";
import Tag from "@/components/common/Tag";
import MusicCard from "@/components/common/MusicCard";
import { useNavigate } from "react-router-dom";
import Time from "@/components/common/Time";

const ReceivedItem = ({ name, birthDate, mbti, tags, lifeMusic, profileId, likeDate }: ItemProps) => {

  const navigate = useNavigate();

  const goToProfile = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/matching/${profileId}`)
    e.stopPropagation();
  };

  // 배경색 목록
  const backgrounds = [
    'bg-background-small-grey',
    'bg-background-small-yellow',
    'bg-background-small-green',
    'bg-background-small-kiwi',
    'bg-background-small-purple',
    'bg-background-small-pink',
    'bg-background-small-sky',
  ];

  const currentBackground = useGetRandomBackgrounds({ backgrounds });
  return (
    <>
      <div
        onClick={goToProfile}
        className={` h-auto mx-[2%] mb-[8px] pt-[12px] pb-[8px] ${currentBackground} rounded-[16px]`}
      >
        <div className={`flex justify-between px-[3%] `}>
          <div className="flex items-center">
            <Name name={name} birthDate={birthDate} mbti={mbti} />
            <div className='flex flex-wrap mb-[5px]'>
              {tags?.map((item) => (
                <Tag name={item.name} state={item.state} />
              ))}
            </div>
          </div>
          {likeDate &&
            <div><Time date={likeDate} /></div>
          }
        </div>
        <MusicCard title={lifeMusic?.title} artist={lifeMusic?.artist} />
      </div>
    </>
  );
}

export default ReceivedItem;