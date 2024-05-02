import React, { useRef, useEffect } from 'react';

type UnlockModalProps = {
  setLock: React.Dispatch<React.SetStateAction<boolean>>;
};

const UnlockModal: React.FC<UnlockModalProps> = ({ setLock }) => {

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

  return (
    <div className="fixed inset-0 bg-[#000] bg-opacity-30 flex justify-center items-center" onClick={() => setLock(prevState => !prevState)}>
      <div className={`relative p-8 bg-white rounded-lg`} ref={unlockModalRef} onClick={e => e.stopPropagation()} data-testid="modalText">
        <p>프로필 잠금을 해제할까요?</p>
        <p>'2' 재화를 소모합니다.</p>
        
      </div>
    </div>
  );
};

export default UnlockModal;

