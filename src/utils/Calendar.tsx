import 'react-calendar/dist/Calendar.css';
import '@/styles/CustomCalendar.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { CustomCalendarDTO } from '@/type/Calendar/Calendar';

const CustomCalendar = ({ onChange, value }: CustomCalendarDTO) => {
  const [nowDate, setNowDate] = useState(
    value ? moment(value).format('YYYY년 MM월 DD일') : '날짜를 입력해주세요',
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleToggleCalendar = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (isOpen && calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, handleClickOutside]);

  const handleDateChange = useCallback(
    (selectedDate: any) => {
      onChange(selectedDate);
      setIsOpen(false);
      setNowDate(moment(selectedDate).format('YYYY년 MM월 DD일'));
    },
    [onChange],
  );

  return (
    <div ref={calendarRef} className="relative">
      {isOpen ? (
        <Calendar
          onChange={handleDateChange}
          value={value}
          next2Label={null}
          prev2Label={null}
          className="flex flex-col items-center justify-center mt-4 mx-auto shadow-md rounded-lg p-4 z-10"
          formatDay={(_, date) => moment(date).format('DD')}
        />
      ) : (
        <button
          onClick={handleToggleCalendar}
          className="button-styling focus:outline-none focus:shadow-outline"
        >
          {nowDate}
        </button>
      )}
    </div>
  );
};

export default CustomCalendar;
