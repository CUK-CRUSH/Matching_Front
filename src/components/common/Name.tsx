import { NameProps } from "@/type/Common/Name";
import { calculateAge } from "@/utils/CalculateAge";


const Name = ({ name, birthDate, mbti, distance, isDark, isProfileCard }: NameProps) => {

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
        {calculateAge(birthDate)}
      </span>
      {mbti !== 'NONE' &&
        <>
          <span className={fontStyle}>
            |
          </span>
          <span className={fontStyle}>
            {mbti}
          </span>
        </>
      }
      {isProfileCard &&
        <>
          <span className={fontStyle}>
            ·
          </span>
          <span className={fontStyle}>
            {distance} km
          </span>
        </>
      }
    </div>
  );
};

export default Name;