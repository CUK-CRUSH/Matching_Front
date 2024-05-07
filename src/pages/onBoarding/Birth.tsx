import ValidationButton from '@/components/validation/validationButton';
import ValidationPrevButton from '@/components/validation/validationPrevButton';
import ValidationText from '@/components/validation/validationText';
import useOnboardingStore from '@/store/store';
import CustomCalendar from '@/utils/Calendar';
import { useState } from 'react';

const BirthPage = () => {
  const { setCurrentPage } = useOnboardingStore();
  const [selectedDate, setSelectedDate] = useState<any>(null);

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <ValidationText
        titleTexts={['생년월일']}
        descriptionTexts={['태어난 년도, 월, 날짜를 입력해주세요']}
      />
      <CustomCalendar onChange={handleDateChange} value={selectedDate} />
      <div className="flex">
        <ValidationPrevButton onStateChange={() => setCurrentPage('kakaoId')} />

        <ValidationButton
          navigation="/matching"
          //   buttonEnabled={selectedSex !== ''}
        />
      </div>
    </div>
  );
};

export default BirthPage;
