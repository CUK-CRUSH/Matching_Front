import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { UnFilledModalProps } from '@/type/ProfileCard/ProfileCard';
import { useNavigate } from 'react-router-dom';


const UnFilledModal = ({ setIsUnfilledModalOpen }: UnFilledModalProps) => {

  const navigate = useNavigate()

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
  }, []);


  return (
    <>

      <div className={`fixed inset-0 bg-[#000] bg-opacity-30 flex justify-center items-center z-10`} >

        <div className={`w-[310px] h-auto p-12 bg-white rounded-lg flex flex-col justify-start items-center z-99`} ref={unlockModalRef} onClick={e => e.stopPropagation()} data-testid="unlockModalText">

          <div className="flex flex-col items-center justify-center">
            <p className="text-[#2f2f2f] text-[1rem] font-semibold text-center">
              내 프로필 정보를 추가하고 프로필 카드를 열어보세요
            </p>
            <p className="text-[#2f2f2f] text-[0.8rem] text-center">
              추가하기를 누르면 마이페이지로 이동합니다
            </p>
          </div>

          <div className={`flex justify-center mt-4`}>
            <Button className={`mr-4 w-[85px]`} variant="secondary" size="sm" onClick={() => setIsUnfilledModalOpen(false)
            }>
              뒤로
            </Button>
            <Button className={`w-[85px] `} variant="default" size="sm"
              onClick={() => {
                navigate('/mypage')
              }}
            >
              추가하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnFilledModal;