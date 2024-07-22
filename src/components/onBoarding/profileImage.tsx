import Cropper from 'react-easy-crop';
import { Button } from '@mui/material';
import ValidationButton from '@/components/validation/validationButton';
import ValidationPrevButton from '@/components/validation/validationPrevButton';
import ValidationText from '@/components/validation/validationText';
import useOnboardingStore from '@/store/validationStore';
import InnerImage from '@/assets/InnerImage.png';
import ProgressBar from '@/utils/ProgressBar';
import { useImageCrop } from '@/hooks/useImageCrop';

const ProfileImagePage = () => {
  const { setCurrentPage, userData } = useOnboardingStore();
  const {
    imageSrc,
    compressedImage,
    crop,
    zoom,
    open,
    croppedArea,
    setCrop,
    setZoom,
    setOpen,
    handleImageChange,
    handleCropComplete,
    setCroppedArea,
  } = useImageCrop(userData.profileImage, true);

  return (
    <div className="flex relative flex-col justify-between h-screen">
      <div className="absolute w-full mt-2">
        <ProgressBar currentPage={2} totalPages={8} />
      </div>
      <ValidationText
        titleTexts={['프로필 이미지']}
        descriptionTexts={[
          'Duett에서 사용할 대표 이미지를 등록해주세요',
          '(얼굴이 명확하게 보이는 사진을 골라주세요)',
        ]}
      />
      <div className="flex flex-col items-center mx-4 mb-40">
        <label htmlFor="file-input" className="cursor-pointer">
          <div className="w-48 h-48 bg-[#303030] flex items-center justify-center rounded-3xl overflow-hidden">
            {compressedImage ? (
              <img
                src={compressedImage}
                alt="Compressed Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <img src={InnerImage} alt="Add" className="w-16 h-16" />
              </div>
            )}
          </div>
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <div className="flex flex-row justify-between p-4 w-full max-w-[430px]">
            <Button onClick={() => setOpen(false)} className="text-red-500">
              취소
            </Button>
            <Button onClick={() => handleCropComplete(croppedArea)} className="text-green-500">
              저장
            </Button>
          </div>
          <div className="relative flex-grow w-full max-w-[430px] h-full">
            <Cropper
              image={imageSrc ?? undefined}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={(_, croppedAreaPixels) => setCroppedArea(croppedAreaPixels)}
              onZoomChange={setZoom}
              style={{
                containerStyle: { height: '100%', width: '100%' },
                cropAreaStyle: { border: '2px solid white' },
              }}
            />
          </div>
        </div>
      )}

      <div className="flex justify-between mt-4">
        <ValidationPrevButton navigation="/login" />
        <ValidationButton
          onStateChange={() => setCurrentPage('kakaoId')}
          buttonEnabled={compressedImage !== null}
        />
      </div>
    </div>
  );
};

export default ProfileImagePage;
