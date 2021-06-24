import { ValidityType } from '../structure';

const badRequestError = { message: 'Bad request' };

export default Entity => class Attendance extends Entity {
  async beforePut({ savedEntity, body, transaction, ctx }) {
    if (!savedEntity) {
      throw badRequestError;
    }

    const { client, class: schoolClass } = savedEntity;
    console.log('Search subscriptions', client, schoolClass);

    if (!client || !schoolClass || !schoolClass.courseUuid) {
      throw badRequestError;
    }

    const { response: subscriptions } = await this.app.Subscription.query({
      data: {
        where: {
          clientUuid: client.uuid,
          '$courses.course.uuid$': schoolClass.courseUuid,
          $or: [
            { validityType: ValidityType.Perpetual },
            { expiredDate: { $lte: new Date() } },
          ],
          closed: false,
        },
      },
    });

    console.log('Got', subscriptions);
    throw { message: 'No valid subscriptions found!' };
  }

  async delete(args) {
    console.log('restore subscription state and activeness if need');
    return super.delete(args);
  }
}
