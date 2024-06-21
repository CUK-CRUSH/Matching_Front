import { useState, useEffect } from 'react';
import Compressor from 'compressorjs';
import { useOnboardingStore } from '@/store/validationStore';

type CroppedArea = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export const useImageCrop = (initialImage: string | null = null, updateUser: boolean = false) => {
  const { setUserData } = useOnboardingStore();
  const [imageSrc, setImageSrc] = useState<string | null>(initialImage);
  const [croppedArea, setCroppedArea] = useState<null | CroppedArea>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(initialImage);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (initialImage) {
      setImageSrc(initialImage);
      setCompressedImage(initialImage);
    } else {
      setCompressedImage(null);
    }
  }, [initialImage]);

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
                  if (updateUser) {
                    setUserData('profileImage', base64data);
                  }
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

  return {
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
  };
};
