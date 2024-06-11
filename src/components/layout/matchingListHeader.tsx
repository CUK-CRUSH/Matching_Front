import { matchingListHeaderProps } from '@/type/MatchingList/MatchingList';
import back from '@/assets/MatchingList/back.svg';
import { Link } from 'react-router-dom';

const MatchingListHeader = ({
  text,
  background = '2c2c2c',
  router,
  mypageText,
  onStateChange,
  marginTop = '20',
}: matchingListHeaderProps) => {
  return (
    <div className={`mt-${marginTop}`}>
      <header
        className={`flex fixed top-[0px] pt-[32px] pb-[12px] w-full max-w-[430px] bg-[${background}] z-10`}
      >
        <div className="flex justify-between w-full px-4">
          <div className="flex flex-row items-center w-full space-x-3">
            {onStateChange ? (
              <img src={back} alt="back" className="cursor-pointer" onClick={onStateChange} />
            ) : (
              <Link to={`/${router ? router : ''}`}>
                <img src={back} alt="back" className="cursor-pointer" />
              </Link>
            )}
            <span className="text-[#F8F8F8] text-xl font-bold">{text}</span>
          </div>
          {mypageText && (
            <span className="flex-grow-0 flex-shrink-0 text-base font-semibold text-right text-[#474747]">
              {mypageText}
            </span>
          )}
        </div>
      </header>
    </div>
  );
};

export default MatchingListHeader;
