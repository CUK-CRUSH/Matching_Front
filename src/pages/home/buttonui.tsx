import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

interface FadeTextProps {
  text: string;
  times: number;
}

const FadeText: React.FC<FadeTextProps> = ({ text, times }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, times);

    return () => clearTimeout(timer);
  }, [times]);

  const handleClick = () => {
    navigate('/survey');
  };

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
      <button
        className={`fade ${visible ? 'visible' : ''} hover:bg-blue-400 rounded-full hover:text-white p-4  text-xl font-bold  border-blue-400  text-white px-8 py-4 bg-blue-600 `}
        onClick={handleClick}
      >
        {text}
      </button>
    </>
  );
};

export default FadeText;
