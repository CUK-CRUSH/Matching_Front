import React, { useRef, useEffect } from 'react';

import star from '@/assets/profileCard/stars.svg';

import { Button } from '@/components/ui/button';
import useProfileCardStore from '@/store/profileCardStore';

type UnlockModalProps = {
  setLock: React.Dispatch<React.SetStateAction<boolean>>;
};

const UnlockModal: React.FC<UnlockModalProps> = ({ setLock }) => {

  // 모달 열고닫기
  const unlockModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (unlockModalRef.current && !unlockModalRef.current.contains(event.target as Node)) {
        setLock(prevState => !prevState)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setLock]);

  // 확인버튼 클릭시 재화 2 소모
  const {setSpend2Coin} = useProfileCardStore();

  const modalBackground = `fixed inset-0 bg-[#000] bg-opacity-30 flex justify-center items-center`;
  const modalStyle = `w-[250px] relative p-12 bg-white rounded-lg flex flex-col justify-start items-center z-99`;
  const starStyle = `w-[2rem] h-[2rem] mb-[1.5rem]`;
  const fontStyle = `text-[#2f2f2f] text-[0.8rem]`;
  const buttonContainer = `flex justify-center mt-4`;

  return (
    <div className={modalBackground} onClick={() => setLock(prevState => !prevState)}>
      <div className={modalStyle} ref={unlockModalRef} onClick={e => e.stopPropagation()} data-testid="modalText">
        <img src={star} alt='star' className={starStyle} />
        <p className={fontStyle}>프로필 잠금을 해제할까요?</p>
        <p className={fontStyle}>'2' 재화를 소모합니다.</p>
        <div className={buttonContainer}>
        <Button className={`mr-4 w-[85px]`} variant="secondary" size="sm" onClick={() => setLock(prevState => !prevState)}>
          취소
        </Button>
        <Button className={`w-[85px] `} variant="default" size="sm" onClick={setSpend2Coin}>
          확인
        </Button>
        </div>

      </div>
    </div>
  );
};

export default UnlockModal;

