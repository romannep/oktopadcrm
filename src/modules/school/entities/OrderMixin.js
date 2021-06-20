import moment from 'moment';
import { orderFields, ValidityType } from '../structure';

export default Entity => class Order extends Entity {
  constructor(args) {
    super(args);
    this.structure.fields = [
      ...this.structure.fields,
      ...orderFields,
    ];
  }

  async beforePut(args) {
    args.ctx.state.createSubscription = !args.savedEntity && args.body.createSubscription;
    if (super.beforePut) {
      return super.beforePut(args);
    }
  }

  async afterPut(args) {
    if (super.afterPut) {
      await super.afterPut(args);
    }
    if (!args.ctx.state.createSubscription) {
      return;
    }
    const subscriptions = args.entity.products || [];
    await Promise.all(subscriptions.map(async (row) => {
      if (!row.product || !row.product.uuid) {
        return;
      }
      const { response: subscription } = await this.app.Product.get({ ctx: args.ctx, data: { uuid: row.product.uuid } });

      if (!subscription.isSubscription) {
        return;
      }
      const startDate = args.entity.subscriptionStarts || new Date();
      let expiredDate;
      if (subscription.validityType === ValidityType.Months) {
        expiredDate = moment(startDate).add(subscription.validityAmount, 'months').toDate();
      } else if (subscription.validityType === ValidityType.Days) {
        expiredDate = moment(startDate).add(subscription.validityAmount, 'days').toDate();
      }
      for (let i = 0; i < row.amount; i++) {
        await this.app.Subscription.put({
          ctx: args.ctx,
          transaction: args.transaction,
          data: {
            body: {
              client: args.entity.client,
              order: args.entity,
              attendances: subscription.attendances,
              validityType: subscription.validityType,
              validityAmount: subscription.validityAmount,
              courses: subscription.courses,
              expiredDate,
              startDate,
              sum: row.price,
            },
          },
        });
      }

    }));
  }
}
