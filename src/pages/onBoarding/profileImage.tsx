import { useState } from 'react';
import Compressor from 'compressorjs';
import Cropper from 'react-easy-crop';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider } from '@mui/material';
import ValidationButton from '@/components/validation/validationButton';
import ValidationPrevButton from '@/components/validation/validationPrevButton';
import ValidationText from '@/components/validation/validationText';
import useOnboardingStore from '@/store/validationStore';

const ProfileImagePage = () => {
  const { setCurrentPage, setUserData } = useOnboardingStore();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedArea, setCroppedArea] = useState<null | {
    width: number;
    height: number;
    x: number;
    y: number;
  }>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [open, setOpen] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setOpen(true);
      };
    }
  };

  const handleCropComplete = async (croppedAreaPixels: any) => {
    try {
      const canvas = document.createElement('canvas');
      const image = new Image();
      image.src = imageSrc!;
      const ctx = canvas.getContext('2d');

      image.onload = () => {
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
        ctx!.drawImage(
          image,
          croppedAreaPixels.x * scaleX,
          croppedAreaPixels.y * scaleY,
          croppedAreaPixels.width * scaleX,
          croppedAreaPixels.height * scaleY,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
        );

        canvas.toBlob(async (blob) => {
          if (blob) {
            new Compressor(blob, {
              quality: 0.6,
              maxWidth: 500,
              maxHeight: 500,
              success(result) {
                const reader = new FileReader();
                reader.readAsDataURL(result);
                reader.onloadend = () => {
                  const base64data = reader.result as string;
                  setCompressedImage(base64data);
                  setUserData('profileImage', base64data);
                  setOpen(false);
                };
              },
              error(err) {
                console.error(err.message);
              },
            });
          }
        }, 'image/jpeg');
      };
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <ValidationText
        titleTexts={['프로필 이미지']}
        descriptionTexts={[
          'Duett에서 사용할 대표 이미지를 등록해주세요',
          '(얼굴이 명확하게 보이는 사진을 골라주세요)',
        ]}
      />
      <div className="flex flex-col items-center mt-16 mx-4">
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
                <img src="/path/to/default-image-icon.png" alt="Add" className="w-16 h-16" />
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

      <div className="h-screen w-full">
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth fullScreen>
          <DialogTitle>이미지 크롭</DialogTitle>
          <DialogContent>
            <Cropper
              image={imageSrc ?? undefined} // null일 때 undefined로 설정
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={(_, croppedAreaPixels) => setCroppedArea(croppedAreaPixels)}
              onZoomChange={setZoom}
            />
          </DialogContent>
          <DialogActions>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(_, zoom) => setZoom(zoom as number)}
            />
          </DialogActions>
          <Button onClick={() => handleCropComplete(croppedArea)}>확인</Button>
        </Dialog>
      </div>
      <div className="flex justify-between mt-4 mx-4">
        <ValidationPrevButton onStateChange={() => setCurrentPage('nickname')} />
        <ValidationButton
          onStateChange={() => setCurrentPage('kakaoId')}
          buttonEnabled={compressedImage !== null}
        />
      </div>
    </div>
  );
};

export default ProfileImagePage;
