
const replaceLike = (title) => {
  if (title.$like
    && Object.keys(title).length === 1 && title.$like.match(/\%.*\%/)) {
    const like = title.$like;
    const likeOr = `%${like[1].toUpperCase() === like[1] ? like[1].toLowerCase() : like[1].toUpperCase()}${like.substr(2)}`;
    return  {
      '$or': [
        { '$like': like },
        { '$like': likeOr },
      ],
    };
  }
};

export default Entity => class ClientMixin extends Entity {

  async query(args) {
    if (this.app.database.isSqlite) {
      if (args.data && args.data.where && args.data.where && args.data.where.$or) {
        args.data.where.$or.forEach((item) => {
          if (item.title) {
            item.title = replaceLike(item.title);
          }
        });
      }
    }
    return super.query(args);
  }
}
