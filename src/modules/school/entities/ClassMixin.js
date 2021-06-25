
export default Entity => class Class extends Entity {
  beforePut({ savedEntity, body }) {
    body.title = `${savedEntity?.course?.title || body?.course?.title} ${savedEntity?.start || body?.start}`;
  }
}
