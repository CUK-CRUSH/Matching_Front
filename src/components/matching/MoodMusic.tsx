import { MoodProps } from '@/type/ProfileCard/ProfileCard';

const MoodMusic = ({ title, artist, moodImageUrl }: MoodProps) => {
  return (
    <div className={`w-[96%] mt-[24px] mx-[2%]`}>
      <p data-testid='Mood' className={`text-[#2F2F2F] text-s ml-[4%] font-bold my-[8px]`}>
        연인과 함께 듣고싶은 곡
      </p>
      <div className={`bg-white p-[2%] rounded-[16px] flex flex-col items-center`}>
        <div
          className={`w-full flex flex-col justify-end bg-cover bg-center text-white rounded-[16px]`}
          style={{ backgroundImage: `url(${moodImageUrl})`, height: '200px' }}
        >
          <div className="bg-opacity-50 w-full p-2 text-center"
            style={{ background: 'linear-gradient(to top, rgba(47, 47, 47, 1) 4%, rgba(47, 47, 47, 0.5) 24%, rgba(47, 47, 47, 0) 100%)' }}
          >
            <p className="font-bold text-s">{title}</p>
            <p className="font-semibold text-m">{artist}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodMusic;
