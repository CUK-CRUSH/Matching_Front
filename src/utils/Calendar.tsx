import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { CustomCalendarDTO } from '@/type/Calendar/Calendar';

const CustomCalendar = ({ onChange, value }: CustomCalendarDTO) => {
  const [nowDate, setNowDate] = useState('날짜');
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (selectedDate: any) => {
    onChange(selectedDate);
    setIsOpen(false);
    setNowDate(moment(selectedDate).format('YYYY년 MM월 DD일'));
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggleCalendar}
        className="bg-gray-200 text-gray-800 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {nowDate}
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 z-10">
          <Calendar
            onChange={handleDateChange}
            value={value}
            formatDay={(_, date) => moment(date).format('DD')}
            className="border border-gray-300 rounded shadow"
          />
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
