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
        views:['week','day','agenda'],
        events: [],
        onSelectEvent: (event) => this.onSelectEvent(event),
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
    console.log('range', range);
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
    }));
    this.content.calendar.events = events;
  }
  onSelectEvent(event) {
    this.classModal.open({ uuid: event.uuid });
  }
}
