import { ProgressBarDTO } from '@/type/Util/ProgressBar';

const ProgressBar = ({ currentPage, totalPages }: ProgressBarDTO) => {
  const progressPercentage = (currentPage / totalPages) * 100;

  return (
    <div className="flex flex-col items-center mx-5">
      <div className="w-full flex justify-end text-m text-[#b0b0b0]">
        {currentPage}/{totalPages}
      </div>
      <div className="relative w-full h-1 bg-[#e0e0e0] rounded">
        <div
          className="absolute h-full bg-black rounded-md"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
