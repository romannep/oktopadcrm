export default Entity => class Trigger extends Entity {
  constructor(args) {
    super(args);
    this.updateTriggers.private = true;
  }
  async updateTriggers() {
    const { response: triggers } = await this.query();
    this.triggers = triggers;
  }
  afterPut() {
    this.updateTriggers();
  }
  checkTriggers({ entity, ctx, transaction, entityName }) {
    (this.triggers || []).forEach((trigger) => {
      if (trigger.conditionEntity === entityName) {
        this.processTrigger({ entity, ctx, transaction, trigger });
      }
    });
  }
  async processTrigger({ entity, ctx, transaction, trigger }) {
    try {
      if (!eval(trigger.condition)) {
        return;
      }
      const body = {};
      trigger.actionEntityFields.forEach(field => body[field.field] = eval(field.value));
      await this.app[trigger.actionEntity].put({ data: { body } });
    } catch (e) {
      console.error('Err eval trigger', e);
    }
  }
}
