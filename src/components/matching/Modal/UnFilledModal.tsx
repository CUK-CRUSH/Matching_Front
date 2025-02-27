import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { UnFilledModalProps } from '@/type/ProfileCard/ProfileCard';
import { useNavigate } from 'react-router-dom';

const UnFilledModal = ({ setIsUnfilledModalOpen }: UnFilledModalProps) => {
  const navigate = useNavigate();

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
      <div
        className={`fixed inset-0 bg-[#000] bg-opacity-30 flex justify-center items-center z-10`}
      >
        <div
          className={`w-[310px] h-auto pt-10 pb-4 bg-white rounded-lg flex flex-col justify-start items-center z-99 shadow-lg`}
          ref={unlockModalRef}
          onClick={(e) => e.stopPropagation()}
          data-testid="unlockModalText"
        >
          <p className="text-[#2f2f2f] text-[1rem] font-semibold text-center ">
            내 프로필 정보를 추가하고
          </p>
          <p className="text-[#2f2f2f] text-[1rem] font-semibold text-center mb-4">
            프로필 카드를 열어보세요
          </p>
          <p className="text-[#858585] text-[0.875rem] text-center">추가하기를 누르면</p>
          <p className="text-[#858585] text-[0.875rem] text-center mb-7">마이페이지로 이동합니다</p>

          <div className={`flex justify-center space-x-3 `}>
            <Button
              className={` w-[100px] h-10 border border-black `}
              variant="secondary"
              size="sm"
              onClick={() => setIsUnfilledModalOpen?.(false)}
            >
              뒤로
            </Button>
            <Button
              className={` w-[100px] h-10`}
              variant="default"
              size="sm"
              onClick={() => {
                navigate('/mypage');
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
