import { forwardRef } from "react";
import { useRef, useState, useEffect,  } from "react";
import {Props , ReturnType, ScrollBarThumbProps } from "@/type/customHook/useCustomScrollBar/useCustomScrollBar"

// 커스텀 스크롤바 훅 정의
export default function useCustomScrollBar({
  outerContainerRef,
  innerContainerRef,
  outerContainerBorderWidth,
}: Props): ReturnType {
  // 스크롤바의 thumb 요소를 참조하기 위한 ref
  const thumbRef = useRef<HTMLDivElement | null>(null);

    // 스크롤바 thumb의 높이를 상태로 관리
  const [thumbH, setThumbHeight] = useState<number>(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    function initThumbHeight() {
      if (
        !outerContainerRef.current ||
        !innerContainerRef.current ||
        !thumbRef.current
      )
        return;
      const { clientHeight: outerH } = outerContainerRef.current;
      const { clientHeight: innerH } = innerContainerRef.current;
      if (innerH <= outerH) return;
      setThumbHeight(outerH ** 1.8   / innerH);
      thumbRef.current.style.transform = `translateY(${outerContainerBorderWidth}px)`;
  
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  
    if (
      !outerContainerRef.current ||
      !innerContainerRef.current ||
      !thumbRef.current
    ) {
      intervalId = setInterval(initThumbHeight, 1);
    } else {
      initThumbHeight();
    }
  
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [
    outerContainerRef,
    innerContainerRef,
    thumbRef,
    outerContainerBorderWidth
  ]);
  
  // thumb의 Y 좌표를 계산하는 함수
  function calculateThumbY() {
    if (!thumbRef.current) return;
    if (!outerContainerRef.current) return;
    if (!innerContainerRef.current) return;

    const { clientHeight: outerH } = outerContainerRef.current;
    const { clientHeight: innerH } = innerContainerRef.current;
    const { top: outerTop } = outerContainerRef.current.getBoundingClientRect();
    const { top: innerTop } = innerContainerRef.current.getBoundingClientRect();
    const innerContainerY = outerTop - innerTop;
    const scrollYFactor = (innerH - thumbH) / (innerH - outerH);
    const maxThumbScrollY = innerH - thumbH;
    const thumbScrollY = innerContainerY * scrollYFactor;
    const revisedThumbScrollY =
      thumbScrollY < outerContainerBorderWidth
        ? outerContainerBorderWidth
        : thumbScrollY;
    thumbRef.current.style.transform = `translateY(${
      revisedThumbScrollY > maxThumbScrollY
        ? maxThumbScrollY
        : revisedThumbScrollY
    }px)`;
  }

  // 스크롤바 thumb 요소 정의
  const ScrollBarThumb = forwardRef<HTMLDivElement, ScrollBarThumbProps>(({ height }, ref) => (
    <div
      ref={ref}
      style={{ height: `${height}px` }}
      className="absolute rounded-sm bg-[#474747]  w-1 right-1 top-3 z-10"
    />
  ));
  console.log(outerContainerRef, innerContainerRef)

  // 커스텀 훅에서 반환할 값들
  return {
    calculateThumbY,
    ScrollBarThumb,
    thumbH,
    thumbRef,
  };
}
