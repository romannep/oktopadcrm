
export default Entity => class Subscription extends Entity {
  beforePut({ savedEntity, body }) {
    body.title = `${savedEntity?.client?.title || body?.client?.title} ${savedEntity?.order?.title || body?.order?.title}`;
  }
}
