import { MusciCardProps } from "@/type/MatchingList/MatchingList"
import useProfileCardStore from "@/store/profileCardStore";

const MusicCard = ({ title, artist, isDark, isProilfeCard, isOpen, videoId}: MusciCardProps) => {

  const { setVideoId,setIsYoutubeModalOpen } = useProfileCardStore();

  const fontStyle = `text-[${isDark ? '#F8F8F8' : '#2f2f2f'}] text-s`

  const handleClick = () => {
    setVideoId(videoId);
    setIsYoutubeModalOpen(true)
  };

  console.log(videoId)
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