import React, { useCallback, useRef } from 'react';
import TUICalendar from '@toast-ui/react-calendar';
import { ISchedule, ICalendarInfo } from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { Box } from '@chakra-ui/react';

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));

const schedules: ISchedule[] = [
  {
    calendarId: '1',
    category: 'time',
    isVisible: true,
    title: 'Study',
    id: '1',
    body: 'Test',
    start,
    end,
  },
  {
    calendarId: '2',
    category: 'time',
    isVisible: true,
    title: 'Meeting',
    id: '2',
    body: 'Description',
    start: new Date(new Date().setHours(start.getHours() + 1)),
    end: new Date(new Date().setHours(start.getHours() + 2)),
  },
];

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

const Calendars = () => {
  return (
    <Box px="3rem" mt="3rem">
      <TUICalendar
        height="100%"
        view="month"
        week={{
          showTimezoneCollapseButton: true,
          timezonesCollapsed: true,
        }}
        scheduleView
  
        calendars={calendars}
        schedules={schedules}
        template={{
          milestone(schedule) {
            return `<span style="color:#fff;background-color: ${schedule.bgColor};">${schedule.title}</span>`;
          },
          milestoneTitle() {
            return 'Milestone';
          },
          allday(schedule) {
            return `${schedule.title}<i class="fa fa-refresh"></i>`;
          },
          alldayTitle() {
            return 'All Day';
          },
        }}
      />
    </Box>
  );
};

export default Calendars;
