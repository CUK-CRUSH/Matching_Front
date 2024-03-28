import React, { useState, useEffect } from 'react';
import Logo from '../../assets/MetLifeLogo.svg';

// Props 타입 정의
interface FadeTextProps {
  times: number; // 밀리초 단위로 표시되는 시간
}

const FadeText: React.FC<FadeTextProps> = ({ times }) => {
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
      <img src={Logo} className={`fade ${visible ? 'visible' : ''} h-12 w-30`} />
    </>
  );
};

export default FadeText;
