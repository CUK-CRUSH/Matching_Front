import useProfileCardStore from "@/store/profileCardStore";
import { YouTubeModalProps } from "@/type/ProfileCard/ProfileCard";

const YoutubeModal = ({ setIsYoutubeModalOpen} : YouTubeModalProps) => {
  
  const {videoId } = useProfileCardStore()
  console.log(videoId)
  const handleClose = () => {
    setIsYoutubeModalOpen?.(false)
  }

  return (
    <div className={`fixed inset-0 bg-[#000] bg-opacity-30 z-10`}
        onClick={handleClose}
    >

      <div
        className={`w-full h-auto relative rounded-lg flex flex-col justify-start items-center z-99`}
        onClick={e => e.stopPropagation()}>

        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default YoutubeModal;