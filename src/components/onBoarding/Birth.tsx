import ValidationButton from '@/components/validation/validationButton';
import ValidationPrevButton from '@/components/validation/validationPrevButton';
import ValidationText from '@/components/validation/validationText';
import useOnboardingStore from '@/store/validationStore';
import CustomCalendar from '@/utils/Calendar';
import ProgressBar from '@/utils/ProgressBar';
import moment from 'moment';
import { useState } from 'react';
import { toast } from 'react-toastify';

const BirthPage = () => {
  const { setCurrentPage, setUserData, userData } = useOnboardingStore();
  const [selectedDate, setSelectedDate] = useState<any>(
    userData.birthDate ? moment(userData.birthDate, 'YYYY년 MM월 DD일').toDate() : null,
  );

  const handleDateChange = (newDate: Date) => {
    const formattedDate = moment(newDate).format('YYYY년 MM월 DD일');
    setSelectedDate(newDate); // newDate는 Date 객체를 저장
    setUserData('birthDate', formattedDate); // 문자열로 변환된 날짜를 저장
  };
  const isOver19 = selectedDate && moment().diff(selectedDate, 'years') >= 19;
  console.log(isOver19);
  const handleNext = () => {
    if (isOver19) {
      setCurrentPage('oneLiner');
    } else {
      toast.error('만 19세 이상만 가입할 수 있습니다.');
    }
  };
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="absolute w-full mt-2">
        <ProgressBar currentPage={7} totalPages={8} />
      </div>
      <ValidationText
        titleTexts={['생년월일']}
        descriptionTexts={['태어난 년도, 월, 날짜를 입력해주세요']}
      />
      <div className="flex items-center justify-center">
        <CustomCalendar onChange={handleDateChange} value={selectedDate} />
      </div>
      <div className="flex">
        <ValidationPrevButton onStateChange={() => setCurrentPage('nickname')} />

        <ValidationButton
          onStateChange={handleNext}
          buttonEnabled={selectedDate !== null && isOver19}
        />
      </div>
    </div>
  );
};

export default BirthPage;
