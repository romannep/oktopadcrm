import Desktop from './forms/Desktop';

export default (app) => {
  app.forms.Desktop = Desktop;
  app.menu.unshift({
    title: 'Desktop',
    form: 'Desktop',
  });
  app.setMenu(app.menu);
}
