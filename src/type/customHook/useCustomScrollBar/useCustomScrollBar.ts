import {MutableRefObject} from 'react'

// Props 인터페이스 정의: 컴포넌트에 전달될 props의 타입을 정의
export type Props = {
    outerContainerRef: MutableRefObject<any | null>;
    innerContainerRef: MutableRefObject<HTMLDivElement | null>;
    outerContainerBorderWidth: number;
}

// ReturnType 인터페이스 정의: 커스텀 훅의 반환 타입을 정의
export type ReturnType = {
    calculateThumbY: () => void;
    ScrollBarThumb: any;
    thumbH: number;
    thumbRef: MutableRefObject<HTMLDivElement | null>;
}
export type ScrollBarThumbProps = {
    height: number;
}