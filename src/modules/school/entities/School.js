
export default class School {
  constructor(args) {
    Object.assign(this, args);
  }

  action({ ctx, data }) {
    console.log('School action', data);
    // задел на будущее.
  }
}
