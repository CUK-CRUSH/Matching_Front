import { forwardRef } from "react";
import { useRef, useState, useEffect, MutableRefObject } from "react";

// Props 인터페이스 정의: 컴포넌트에 전달될 props의 타입을 정의
interface Props {
  outerContainerRef: MutableRefObject<any | null>;
  innerContainerRef: MutableRefObject<HTMLDivElement | null>;
  outerContainerBorderWidth: number;
}

// ReturnType 인터페이스 정의: 커스텀 훅의 반환 타입을 정의
interface ReturnType {
  calculateThumbY: () => void;
  ScrollBarThumb: any;
  thumbH: number;
  thumbRef: MutableRefObject<HTMLDivElement | null>;
}
interface ScrollBarThumbProps {
  height: number;
}
// 커스텀 스크롤바 훅 정의
export default function useCustomScrollBar({
  outerContainerRef,
  innerContainerRef,
  outerContainerBorderWidth,
}: Props): ReturnType {
  // 스크롤바의 thumb 요소를 참조하기 위한 ref
  const thumbRef = useRef<HTMLDivElement | null>(null);

    // 스크롤바 thumb의 높이를 상태로 관리
  const [thumbH, setThumbHeight] = useState(0);

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
      setThumbHeight(outerH ** 1.9   / innerH);
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
      className="absolute cursor-pointer rounded-sm bg-yellow-300  w-1.5 right-1 top-3 z-10"
    />
  ));

  // 커스텀 훅에서 반환할 값들
  return {
    calculateThumbY,
    ScrollBarThumb,
    thumbH,
    thumbRef,
  };
}
