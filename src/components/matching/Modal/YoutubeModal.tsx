import { YouTubeModalProps } from "@/type/ProfileCard/ProfileCard";

const YoutubeModal = ({url} : YouTubeModalProps) => {

  function convertYouTubeUrl(url? : string): string {
    // URL에서 동영상 ID 추출
    const videoId = url?.split('?v=')[1];
  
    // 동영상 ID를 이용해 embed URL 생성
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  
    return embedUrl;
  }
  
  return (
    <div className={`fixed inset-0 bg-[#000] bg-opacity-30 flex justify-center items-center`} >

      <div
        className={`w-full h-auto relative bg-white rounded-lg flex flex-col justify-start items-center z-99`}
        onClick={e => e.stopPropagation()}>

        <iframe
          width="100%"
          height="315"
          src={convertYouTubeUrl(url)}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default YoutubeModal;