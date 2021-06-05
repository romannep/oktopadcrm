import moment from 'moment';
import { Form, Elements } from 'katejs/lib/client';
import ClassModal from './ClassModal';


export default class Schedule extends Form {
  static title = 'Schedule';

  constructor(args) {
    super(args);

    this.classModal = new ClassModal({
      content: this.content,
      app: this.app,
      form: this,
      load: () => this.load(),
    });

    this.elements = [
      {
        id: 'calendar',
        type: 'Calendar',
        onSelectSlot: (params) => this.newClass(params),
        onRangeChange: (params) => this.onRangeChange(params),
        // views:['week','day','agenda'],
        events: [],
        onSelectEvent: (event) => this.onSelectEvent(event),
        onEventResize: (data) => this.onEventResize(data),
        onEventDrop: (data) => this.onEventResize(data),
      },
      ...this.classModal.elements,
    ];
    this.start = moment().startOf('week').toDate();
    this.end = moment().endOf('week').toDate();
    this.load();
  }

  newClass(params) {
    this.classModal.open(params);
  }

  onRangeChange(range) {
    if (range.start) {
      this.start = moment(range.start).startOf('day').toDate();
      this.end = moment(range.end).endOf('day').toDate();
    } else {
      this.start = moment(range[0]).startOf('day').toDate();
      this.end = moment(range[range.length - 1]).endOf('day').toDate();
    }
    this.load();
  }

  async load() {
    const { response: classes } = await this.app.Class.query({
      where: {
        start: {
          $lte: this.end,
          $gte: this.start,
        }
      },
    });
    const events = classes.map((event) => ({
      start: moment(event.start).toDate(),
      end: moment(event.start).add(event.durationMin, 'minutes').toDate(),
      uuid: event.uuid,
      title: `${event.course ? event.course.title : 'Занятие'} (${event.tutor ? event.tutor.title : ''})`,
    }));
    this.content.calendar.events = events;
  }

  onSelectEvent(event) {
    this.classModal.open({ uuid: event.uuid });
  }

  async onEventResize(data) {
    const { start, end, event } = data;
    event.start = start;
    event.end = end;
    this.content.calendar.events = [...this.content.calendar.events];
    await this.app.Class.put({
      uuid: event.uuid,
      body: {
        start,
        durationMin: Math.ceil( (end.getTime() - start.getTime()) / (1000 * 60) ),
      },
    });
    await this.load();
  }
}
