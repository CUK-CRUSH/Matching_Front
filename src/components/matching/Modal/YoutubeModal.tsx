import useProfileCardStore from "@/store/profileCardStore";
import { YouTubeModalProps } from "@/type/ProfileCard/ProfileCard";

const YoutubeModal = ({ setIsYoutubeModalOpen} : YouTubeModalProps) => {
  
  const {videoId } = useProfileCardStore()
  
  const handleClose = () => {
    setIsYoutubeModalOpen?.(false)
  }

  return (
    <div className={`fixed inset-0 bg-[#000] bg-opacity-30 z-10`} onClick={handleClose}>
    <div
        className={`w-full max-w-[430px] h-auto rounded-lg flex flex-col justify-center items-center z-99 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        onClick={e => e.stopPropagation()}
    >
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