export type CommonModalDTO = {
  imageSrc?: string;
  mainText?: string;
  subText?: string;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
};
