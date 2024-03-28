import React, { useState, useEffect } from 'react';

// Props 타입 정의
interface FadeTextProps {
  text: string;
  times: number; // 밀리초 단위로 표시되는 시간
}

const FadeText: React.FC<FadeTextProps> = ({ text, times }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, times);

    return () => clearTimeout(timer);
  }, [times]);

  return (
    <>
      <style>
        {`
          .fade {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 1s ease-in-out, transform 1s ease-in-out; // 페이드 인과 함께 위로 올라오는 애니메이션 적용
          }

          .visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}
      </style>
      <div className={`fade ${visible ? 'visible' : ''} text-4xl font-black`}>{text}</div>
    </>
  );
};

export default FadeText;
