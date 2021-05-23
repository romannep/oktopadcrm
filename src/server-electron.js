import '@babel/polyfill';
import { Server as KateJSServer } from 'katejs';
import AppServer from './AppServer';
import translations from './translations';

let env;
if (process.env.ENV) {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  env = require(`../env.${process.env.ENV.trim()}.json`);
} else {
  // eslint-disable-next-line global-require
  env = require('../env.json');
}
const database = {
  host: process.env.DB_HOST || env.database.host,
  database: process.env.DB_DB || env.database.database,
  username: process.env.DB_USER || env.database.username,
  password: process.env.DB_PASSWORD || env.database.password,
  storage: process.env.DB_STORAGE || env.database.storage,
};
if (env.database.dialect) {
  database.dialect = env.database.dialect;
}
const http = {
  port: process.env.PORT || env.http.port,
};

export function getServer(dataFile, updatesFile) {
  database.storage = dataFile;
  env.updatelog = updatesFile;
  return new KateJSServer({ AppServer, http, database, env, translations });
}
