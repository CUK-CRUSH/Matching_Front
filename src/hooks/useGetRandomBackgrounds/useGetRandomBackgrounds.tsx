import { useGetRandomBackgroundsProps } from "@/type/customHook/useGetRandomBackgrounds";
import { useEffect, useState } from "react";

const useGetRandomBackgrounds = ({backgrounds} : useGetRandomBackgroundsProps) => {

    const [previousBackground, setPreviousBackground] = useState<string>('');
    const [currentBackground, setCurrentBackground] = useState<string>('');
  
    useEffect(() => {
      // 이전 배경색을 제외한 새로운 배경색 목록 생성
      const newBackgrounds = backgrounds.filter((bg) => bg !== previousBackground);
  
      // 새로운 배경색 목록에서 랜덤으로 하나 선택
      const randomBackground = newBackgrounds[Math.floor(Math.random() * newBackgrounds.length)];
  
      // 현재 배경색을 업데이트하고, 이전 배경색 상태도 업데이트
      setCurrentBackground(randomBackground);
      setPreviousBackground(currentBackground);
    }, [previousBackground]);
  
    return currentBackground;
}

export default useGetRandomBackgrounds;