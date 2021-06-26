import { ValidityType } from '../structure';

const badRequestError = { message: 'Bad request' };

export default Entity => class Attendance extends Entity {
  async beforePut({ savedEntity, body, transaction, ctx }) {

    if (body.attend === undefined) {
      return;
    }

    if (body.attend === false) {
      const { response: subscription } = await this.app.Subscription.get({ data: { uuid: savedEntity.subscription.uuid } });
      const visits = subscription.visits - 1;
      const closed = subscription.attendances <= visits;
      await this.app.Subscription.put({
        data: {
          uuid: subscription.uuid,
          body: {
            visits,
            closed,
          },
        },
        transaction,
      });
      return;
    }

    if (!savedEntity) {
      throw badRequestError;
    }

    const { client, class: schoolClass } = savedEntity;

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
            { expiredDate: { $gte: new Date() } },
          ],
          startDate: { $lte: new Date() },
          closed: false,
        },
      },
    });
    // У абонемента может выйти срок и при этом флаг closed не будет установлен
    // У нас на руках не просроченные и не закрытые абонементы
    // Найдем доступный по лимиту посещений
    let subscriptionValue;
    for (let i = 0; i < subscriptions.length; i++) {
      const subscription = subscriptions[i];
      const { response: allVisits } = await this.query({ data: { where: { subscriptionUuid: subscription.uuid }, noOptions: true } });
      let visits = allVisits.length;
      let closed;
      if (!subscription.attendances) { // unlim
        visits += 1;
        subscriptionValue = subscription;
        closed = false;
      } else {
        if (subscription.attendances > visits) {
          visits += 1;
          subscriptionValue = subscription;
        }
        closed = visits >= subscription.attendances;
      }

      await this.app.Subscription.put({
        data: {
          uuid: subscription.uuid,
          body: {
            closed,
            visits,
          },
        },
        transaction,
      });

      if (subscriptionValue) {
        break;
      }
    }
    if (!subscriptionValue) {
      throw { message: 'No valid subscriptions found!' };
    }
    // Есть доступный абонемент
    body.subscription = subscriptionValue;
  }

  async delete(args) {
    const { response: attendance } = await this.get({ data: { uuid: args.data.uuid } });
    if (attendance.subscription && attendance.subscription.uuid && attendance.attend) {
      const { response: subscription } = await this.app.Subscription.get({ data: { uuid: attendance.subscription.uuid } });
      const visits = subscription.visits - 1;
      const closed = subscription.attendances <= visits;
      await this.app.Subscription.put({
        data: {
          uuid: subscription.uuid,
          body: {
            visits,
            closed,
          },
        },
      });
    }
    return super.delete(args);
  }
}
