import { YouTubeModalProps } from "@/type/ProfileCard/ProfileCard";
import { useEffect } from "react";

const YoutubeModal = ({videoId} : YouTubeModalProps) => {
  useEffect(() => {
    // 모달이 열릴 때 body의 overflow 스타일을 hidden으로 설정
    document.body.style.overflow = 'hidden';

    // 컴포넌트가 언마운트될 때 overflow 스타일을 원래대로 복원
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={`fixed inset-0 bg-[#000] bg-opacity-30 z-10`} >

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