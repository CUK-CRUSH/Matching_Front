import ValidationButton from '@/components/validation/validationButton';
import ValidationPrevButton from '@/components/validation/validationPrevButton';
import ValidationText from '@/components/validation/validationText';
import useOnboardingStore from '@/store/validationStore';
import CustomCalendar from '@/utils/Calendar';
import moment from 'moment';
import { useState } from 'react';

const BirthPage = () => {
  const { setCurrentPage, setUserData, userData } = useOnboardingStore();
  const [selectedDate, setSelectedDate] = useState<any>(
    userData.birthDate ? moment(userData.birthDate, 'YYYY년 MM월 DD일').toDate() : null,
  );

  const handleDateChange = (newDate: Date) => {
    const formattedDate = moment(newDate).format('YYYY년 MM월 DD일');
    setSelectedDate(newDate);
    setUserData('birthDate', formattedDate); // Store as a string
  };
  console.log(userData);

  return (
    <div className="flex flex-col justify-between h-screen">
      <ValidationText
        titleTexts={['생년월일']}
        descriptionTexts={['태어난 년도, 월, 날짜를 입력해주세요']}
      />
      <div className="flex items-center justify-center">
        <CustomCalendar onChange={handleDateChange} value={selectedDate} />
      </div>
      <div className="flex">
        <ValidationPrevButton onStateChange={() => setCurrentPage('nickname')} />

        <ValidationButton navigation="/matching" buttonEnabled={selectedDate !== null} />
      </div>
    </div>
  );
};

export default BirthPage;
