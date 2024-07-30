import { useRef, useEffect } from 'react';
import star from '@/assets/ProfileCard/stars.svg';
import { Button } from '@/components/ui/button';
import { UnlockModalProps } from '@/type/ProfileCard/ProfileCard';

import useProfileCardStore from '@/store/profileCardStore';

const UnlockModal = ({ setLock, handleSetOpen, handleSetLockOpen, setIsUnlockModalOpen, isOpen, activeIndex }: UnlockModalProps) => {
  console.log(activeIndex )
  const { setAbleSpend, setIndex } = useProfileCardStore();
  // 모달 열고닫기
  const unlockModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (unlockModalRef.current && !unlockModalRef.current.contains(event.target as Node)) {
        // setLock(prevState => !prevState)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setLock]);

  // 확인버튼 클릭시 재화 2 소모
  const openProfileCard = async () => {
    setAbleSpend(true)
    setIndex(activeIndex)
  };

  return (
    <>
      {!isOpen &&
        <div className={`fixed inset-0 bg-[#000] bg-opacity-30 flex justify-center items-center z-10`} >

          <div className={`w-[250px] h-auto relative p-12 bg-white rounded-lg flex flex-col justify-start items-center z-99`} ref={unlockModalRef} onClick={e => e.stopPropagation()} data-testid="unlockModalText">

            <img src={star} alt='star' className={`w-[2rem] h-[2rem] mb-[1.5rem]`} />
            <p className={`text-[#2f2f2f] text-[0.8rem]`}>프로필 잠금을 해제할까요?</p>
            <p className={`text-[#2f2f2f] text-[0.8rem]`}>'2' 재화를 소모합니다.</p>
            <div className={`flex justify-center mt-4`}>
              <Button className={`mr-4 w-[85px]`} variant="secondary" size="sm" onClick={() => setIsUnlockModalOpen?.(false)
              }>
                취소
              </Button>
              <Button className={`w-[85px] `} variant="default" size="sm"
                onClick={() => {
                  openProfileCard();
                }}
              >
                확인
              </Button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default UnlockModal;