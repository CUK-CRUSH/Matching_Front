import 'react-calendar/dist/Calendar.css';
import '@/styles/CustomCalendar.css';
import { useCallback } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { CustomCalendarDTO } from '@/type/Calendar/Calendar';

const CustomCalendar = ({ onChange, value }: CustomCalendarDTO) => {
  const handleDateChange = useCallback(
    (selectedDate: any | Date[] | null) => {
      if (selectedDate && !Array.isArray(selectedDate)) {
        onChange(selectedDate);
      } else {
        onChange(null);
      }
    },
    [onChange],
  );

  return (
    <div className="flex flex-col items-center justify-center mt-4 mx-auto shadow-md rounded-lg p-4 z-10">
      <Calendar
        onChange={handleDateChange}
        value={value}
        next2Label={null}
        prev2Label={null}
        formatDay={(_, date) => moment(date).format('DD')}
      />
    </div>
  );
};

export default CustomCalendar;
