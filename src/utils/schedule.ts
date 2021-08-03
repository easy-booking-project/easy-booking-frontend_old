import { ISchedule } from 'tui-calendar';

export default class Schedule {
  //eslint-disable-next-line no-underscore-dangle
  _id?: string;

  title?: string;

  description?: string;

  start?: Date;

  end?: Date;

  toTUICalendarFormat() {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this._id,
      category: 'time',
      isVisible: true,
      title: this.title,
      body: this.description,
      start: this.start,
      end: this.end,
    } as ISchedule;
  }
}
