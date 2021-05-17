
export default Entity => class SettingsMixin extends Entity {
  async get({ ctx }) {
    const response = await super.get({ ctx });
    response.response.modules = this.app.env.modules;
    return response;
  }
}
