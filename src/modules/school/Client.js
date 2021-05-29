import Schedule from './forms/Schedule';
import Components from './components';

import translations from './translations';
import { structures } from './structure';

export default (app) => {
  app.init({ structures, addToMenu: true });

  app.forms.Schedule = Schedule;
  app.menu.unshift({
    title: 'Schedule',
    form: 'Schedule',
  });
  app.setMenu(app.menu);

  app.constructor.components = { ...app.constructor.components, ...Components };

  // в конструкторе приложения замыкается объект translations.ru - нельзя его переопределять.
  Object.assign(app.translations.ru, translations.ru);
}
