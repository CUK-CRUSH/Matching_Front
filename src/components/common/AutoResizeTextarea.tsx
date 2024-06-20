import { useState, useEffect, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { AutoResizeTextareaProps } from '@/type/Common/AutoResizeTextarea';

const AutoResizeTextarea = ({ value } : AutoResizeTextareaProps) => {
  const [height, setHeight] = useState<string>('auto');
  // HTMLTextAreaElement 타입을 useRef에 명시하여 textarea 참조 타입을 정확하게 합니다.
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      setHeight('auto'); // 먼저 높이를 auto로 설정하여 정확한 scrollHeight를 얻을 수 있도록 합니다.
      setHeight(`${textareaRef.current.scrollHeight}px`); // scrollHeight를 사용하여 높이를 설정합니다.
    }
  }, [value]); // value가 변경될 때마다 이 useEffect가 실행됩니다.

  return (
    <Textarea
      ref={textareaRef}
      className="text-m text-[#2F2F2F] bg-[#fff] border-0 rounded-[12px] overflow-hidden resize-none"
      style={{ height }}
      value={value}
      readOnly
    />
  );
};

export default AutoResizeTextarea;

