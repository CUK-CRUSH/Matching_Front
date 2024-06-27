import { NameProps } from "@/type/Common/Name";


const Name = ({name, age, mbti, isDark} : NameProps) => {
  
  const fontStyle = `${isDark ? 'text-[#858585]' : 'text-[#2f2f2f]'} text-m mr-[0.2em] ${isDark ? '' : 'text-opacity-40'}`;

  return (
    <div>
      <span className={`font-bold text-[${isDark ? '#fff' : '#000'}] text-m opacity-100 mr-[0.2em]`}>
        {name}
      </span>
      <span className={fontStyle}>
        |
      </span>
      <span className={fontStyle}>
        {age}
      </span>
      <span className={fontStyle}>
        |
      </span>
      <span className={fontStyle}>
        {mbti}
      </span>
    </div>
  );
};

export default Name;