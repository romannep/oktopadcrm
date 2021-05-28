import Schedule from './forms/Schedule';
import Components from './components';

import translations from './translations';

export default (app) => {
  console.log('School constr');
  app.forms.Schedule = Schedule;
  app.menu.unshift({
    title: 'Schedule',
    form: 'Schedule',
  });
  app.setMenu(app.menu);

  app.constructor.components = { ...app.constructor.components, ...Components };

  // в конструкторе приложения замыкается объект translations.ru - нельзя его переопределять.
  Object.keys(translations.ru).forEach((key) => app.translations.ru[key] = translations.ru[key]);
}
