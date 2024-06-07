import { MusciCardProps } from "@/type/MatchingList/MatchingList"

const MusicCard = ({song,artist,isDark,isProilfeCard} : MusciCardProps) =>{

    const fontStyle = `text-[${isDark ? '#F8F8F8' : '#2f2f2f'}] text-s`

    return(
        <div
          data-testid='musicCard' 
          className={`${isProilfeCard ? 'h-[48px]' : 'h-[35px]'} mx-[2%] mt-[4px] rounded-[12px] text-[#2f2f2f] bg-[${isDark ? '#000' : '#fff'}] py-[10px] px-[4%] flex justify-between items-center text-[12px]`}>
        <p className={fontStyle}>{song}</p>
        <p className={fontStyle}>{artist}</p>
      </div>
    )
}

export default MusicCard