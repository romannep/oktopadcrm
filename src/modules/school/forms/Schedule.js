import { Form, Elements } from 'katejs/lib/client';


export default class Schedule extends Form {
  static title = 'Schedule';

  constructor(args) {
    super(args);

    this.elements = [
      {
        type: 'Calendar',
      },
    ];
  }
}
