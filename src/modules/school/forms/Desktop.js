import { Form, Elements } from 'katejs/lib/client';


export default class Desktop extends Form {
  constructor(args) {
    super(args);

    this.elements = [
      {
        type: Elements.LABEL,
        title: 'Hello, world',
      },
    ];
  }
}
