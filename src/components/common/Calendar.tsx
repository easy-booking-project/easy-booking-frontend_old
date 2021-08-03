import React from 'react';
import TUICalendar from '@toast-ui/react-calendar';
import { ISchedule, ICalendarInfo } from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { Box, Button } from '@chakra-ui/react';
import Schedule from '../../utils/schedule';
import ScheduleModification from './ScheduleModification';

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));

const json = [
  {
    start: new Date(),
    end: new Date(new Date().setMinutes(start.getMinutes() + 30)),
    title: 'A',
    description: 'AAA',
    _id: 'qwerty',
  },
  {
    start: new Date(),
    end: new Date(new Date().setMinutes(start.getMinutes() + 30)),
    title: 'B',
    description: 'BBB',
    _id: 'qazwsx',
  },
];

const schedules: ISchedule[] = json.map((a) => {
  const o = Object.assign(new Schedule(), a);
  return o.toTUICalendarFormat();
});

// const schedules: ISchedule[] = [
//   {
//     // id: '1',
//     // calendarId: '1',
//     category: 'time',
//     isVisible: true,
//     title: 'event 1',
//     body: 'Test',
//     start,
//     end,
//     color: 'blue',
//     bgColor: 'red',
//   },
//   {
//     id: '2',
//     // calendarId: '2',
//     category: 'allday',
//     isVisible: true,
//     title: 'event 2',
//     body: 'Description',
//     start: new Date(new Date().setHours(start.getHours() + 1)),
//     end: new Date(new Date().setHours(start.getHours() + 2)),
//     color: 'red',
//     bgColor: 'blue',
//   },
// ];

const calendars: ICalendarInfo[] = [
  {
    id: '0',
    name: 'Private',
    bgColor: '#9e5fff',
    borderColor: '#9e5fff',
  },
  {
    id: '1',
    name: 'Company',
    bgColor: '#00a9ff',
    borderColor: '#00a9ff',
  },
];

const Calendars: React.FC = () => {
  const [view, setView] = React.useState('month');

  return (
    <Box px="3rem" mt="3rem">
      {/* {display && <PopUp/>} */}
      <TUICalendar height="100%" schedules={schedules} view={view} useDetailPopup useCreationPopup />
      <ScheduleModification />
    </Box>
  );
};

export default Calendars;
