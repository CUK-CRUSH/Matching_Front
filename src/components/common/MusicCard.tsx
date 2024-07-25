import { MusciCardProps } from "@/type/MatchingList/MatchingList"
import { useEffect, useState } from "react";
import YoutubeModal from "../matching/Modal/YoutubeModal";

const MusicCard = ({ title, artist,url, isDark, isProilfeCard, isOpen }: MusciCardProps) => {

  const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (isYoutubeModalOpen) {
      document.body.style.overflow = 'hidden';

    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isYoutubeModalOpen]);

  const fontStyle = `text-[${isDark ? '#F8F8F8' : '#2f2f2f'}] text-s`

  const handleClick = () => {
    setIsYoutubeModalOpen((prevState) => !prevState);
  };

  // 유튜브 모달
  return (
    <div
      data-testid='musicCard'
      onClick={isOpen ? handleClick : undefined}
      className={`${isProilfeCard ? 'h-[48px]' : 'h-[35px]'} mx-[2%] mt-[4px] rounded-[12px] text-[#2f2f2f] bg-[${isDark ? '#000' : '#fff'}] py-[10px] px-[4%] flex justify-between items-center text-[12px]`}>

      {isYoutubeModalOpen && <YoutubeModal url={url} />}

      <p className={fontStyle}>{title}</p>
      <p className={fontStyle}>{artist}</p>
    </div>
  )
}

export default MusicCard