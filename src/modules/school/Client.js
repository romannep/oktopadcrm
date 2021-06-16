import Schedule from './forms/Schedule';
import Components from './components';

import translations from './translations';
import { structures } from './structure';
import CourseItemMixin from './forms/CourseItemMixin';
import ProductItemMixin from './forms/ProductItemMixin';

export default (app) => {
  app.init({ structures, addToMenu: true });

  app.constructor.components = { ...app.constructor.components, ...Components };

  // в конструкторе приложения замыкается объект translations.ru - нельзя его переопределять.
  Object.assign(app.translations.ru, translations.ru);

  app.forms.Schedule = Schedule;
  app.forms.CourseItem = CourseItemMixin(app.forms.CourseItem);
  app.forms.ProductItem = ProductItemMixin(app.forms.ProductItem);

  app.menu.unshift({
    title: 'Schedule',
    form: 'Schedule',
  });
  const supportRule = { entity: 'Role', method: 'put' };
  app.getMenuItem('Attendances').rule = supportRule;
  app.getMenuItem('Classs').rule = supportRule;
  app.getMenuItem('Subscriptions').rule = supportRule;
  app.setMenu(app.menu);

}
