import React from 'react';
import doubleDown from '@/assets/profileCard/double-down.svg';

type SpreadProfileCardImageProps = {
  setLock: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpreadProfileCard: React.FC<SpreadProfileCardImageProps> = ({ setLock }) => {

  const spreadProfileCardStyle = `w-full flex justify-center items-center cursor-pointer relative -bottom-[160px] h-[50px] `;
  const fontStyle = `font-bold text-[#2F2F2F] text-[0.7rem] flex items-center gap-2`;

  return (
    <div className={spreadProfileCardStyle} onClick={() => setLock(prevState => !prevState)}>
      <p className={fontStyle}>잠금해제하고 더 읽기 <img src={doubleDown} alt="spread" /></p>
    </div>
  );
};

export default SpreadProfileCard;