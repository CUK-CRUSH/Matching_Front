import { MusciCardProps } from "@/type/MatchingList/MatchingList"
import useProfileCardStore from "@/store/profileCardStore";

const MusicCard = ({ title, artist,videoId, isDark, isProilfeCard, isOpen,setIsYoutubeModalOpen}: MusciCardProps) => {

  const { setVideoId } = useProfileCardStore();

  const fontStyle = `text-[${isDark ? '#F8F8F8' : '#2f2f2f'}] text-s`

  const handleClick = () => {
    videoId && setVideoId(videoId);
    setIsYoutubeModalOpen(true)
  };

  // 유튜브 모달
  return (
    <div
      data-testid='musicCard'
      onClick={isOpen ? handleClick : undefined}
      className={`${isProilfeCard ? 'h-[48px]' : 'h-[35px]'} mx-[2%] mt-[4px] rounded-[12px] text-[#2f2f2f] bg-[${isDark ? '#000' : '#fff'}] py-[10px] px-[4%] flex justify-between items-center text-[12px]`}>


      <p className={fontStyle}>{title}</p>
      <p className={fontStyle}>{artist}</p>
    </div>
  )
}

export default MusicCard