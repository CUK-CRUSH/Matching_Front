import { ItemProps } from "@/type/MatchingList/MatchingList";

import MusicCard from "@/components/common/MusicCard"
import Tag from "@/components/common/Tag";
import Name from "@/components/common/Name";
import { useNavigate } from "react-router-dom";
import Time from "../common/Time";

const SendedItem = ({ name, birthDate, mbti, tags,  lifeMusic,profileId,likeDate }: ItemProps) => {
  
  const navigate = useNavigate();

  const goToProfile = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/matching/${profileId}`)
    e.stopPropagation();
  };

  return (
    <>
      <div className="relative h-auto mx-[2%] mb-[8px] pt-[12px] pb-[8px]"
        onClick={goToProfile}
      >
        <div className="flex justify-between px-[3%] text-s">
          <div className="flex items-center">
          <Name name={name} birthDate={birthDate} mbti={mbti} isDark={true} />
          <div className='flex flex-wrap mb-[5px]'>
              {tags?.map((item) => (
                <Tag name={item.name} state={item.state} isDark={true} />
              ))}
            </div>      
          </div>
          <div><Time date={likeDate} /></div>
        </div>

        <MusicCard title={lifeMusic?.title} artist={lifeMusic?.artist} />
        {/* 메시지 팝업 클릭했을때 */}


        {/* 하단 테두리 */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-4%)] h-[1px] bg-[#191919]" />

      </div>
    
    </>
  );
};

export default SendedItem;
