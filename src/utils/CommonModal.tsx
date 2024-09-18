import { Button } from '@/components/ui/button';
import { CommonModalDTO } from '@/type/Util/CommonModal';

const CommonModal = ({
  imageSrc,
  mainText,
  subText,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}: CommonModalDTO) => {
  return (
    <div className={`fixed inset-0 bg-[#000] bg-opacity-30 flex justify-center items-center z-50`}>
      <div
        className={`w-[250px] h-auto relative p-12 bg-white rounded-lg flex flex-col justify-start items-center z-99`}
        onClick={(e) => e.stopPropagation()}
        data-testid="ModalText"
      >
        {imageSrc && <img src={imageSrc} alt="modal" className={`w-[2rem] h-[2rem] mb-[1.5rem]`} />}
        <p className="text-[#2f2f2f] text-[0.8rem] text-center">{mainText}</p>
        {subText && <p className="text-[#2f2f2f] text-[0.8rem] text-center">{subText}</p>}
        <div className="flex justify-center mt-4">
          <Button className="mr-4 w-[85px]" variant="secondary" size="sm" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button className="w-[85px]" variant="default" size="sm" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
