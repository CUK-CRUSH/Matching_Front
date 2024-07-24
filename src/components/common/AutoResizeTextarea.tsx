import { useState, useEffect, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { AutoResizeTextareaProps } from '@/type/Common/AutoResizeTextarea';

const AutoResizeTextarea = ({ value, isDark }: AutoResizeTextareaProps) => {
  const [height, setHeight] = useState<string>('auto');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      setHeight('auto');
      const maxHeight = 500; // 최대 높이 설정 (200px)
      const actualHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
      setHeight(`${actualHeight}px`);
    }
  }, [value]);

  return (
    <Textarea
      ref={textareaRef}
      className={`text-m text-[${isDark ? '#F8F8F8' : '#2F2F2F'}] 
                bg-[${isDark ? '#252525' : '#ffffff'}] border-0 rounded-[12px] 
                scrollbar-hide overflow-scroll resize-none max-h-[200px]`}
      style={{ height }}
      value={value}
      readOnly
    />
  );
};

export default AutoResizeTextarea;
