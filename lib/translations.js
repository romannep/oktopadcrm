"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _translations = _interopRequireDefault(require("katejs/lib/translations"));

var _objectSpread2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable quote-props */
var translate = {
  languages: ['ru'],
  ru: _objectSpread(_objectSpread({}, _translations.default.ru), {}, (_objectSpread2 = {
    'Assistant': 'Ассистент',
    'Prev': 'Пред.',
    'Next': 'След.',
    'Notes': 'Заметки',
    'Note': 'Заметкa',
    'Note done': 'Завершено',
    'Done': 'Выполнено',
    'Description': 'Описание',
    'Checklist': 'Список',
    'Show all': 'Показывать все',
    'NoteDone': 'Завершено',
    'Orders': 'Заказы',
    'Order': 'Заказ',
    'Product': 'Товар',
    'Products': 'Товары',
    'Date': 'Дата',
    'Number': 'Номер',
    'Clients': 'Клиенты',
    'Client': 'Клиент',
    'Phone': 'Телефон',
    'Total': 'Итого',
    'Amount': 'Количество',
    'Price': 'Цена',
    'Sum': 'Сумма',
    'Product sales': 'Продажи товаров',
    'Form report': 'Сформировать',
    'Period start': 'Начало периода',
    'Period end': 'Конец периода',
    'Address': 'Адрес',
    'Comment': 'Комментарий',
    'Period': 'Период',
    'Apply': 'Применить',
    'Paid': 'Оплачено',
    'To pay': 'Оплатить',
    'Find, create': 'Найти, создать',
    'Find, create client': 'Найти, создать клиента',
    'Client (name, phone, address)': 'Клиент (имя, телефон, адрес)',
    'Search (name, phone, address)': 'Поиск (имя, телефон, адрес)',
    'Spread payment': 'Распределить оплату',
    'Spread': 'Распределить',
    'Spread payment from ': 'Распределение оплаты от ',
    'Doing spread...': 'Распределяем...',
    'No sum!': 'Нет суммы',
    'Spreaded ': 'Распределено ',
    ' to order ': ' на заказ ',
    'Rest sum ': 'Остаточная суммма ',
    ' from ': ' от ',
    'What\'s new': 'Информация',
    'Payments': 'Оплаты',
    'Payment': 'Оплата',
    'Clientpayments': 'Оплаты клиентов',
    'Cashboxs': 'Кассы/счета',
    'Cashbox': 'Касса/счет',
    'Fill by debts': 'Заполнить по расчетам',
    'Orders to deliver': 'Заказы к доставке',
    'Show negative sum': 'Показывать отрицательные суммы',
    'Expenses': 'Расходы',
    'Expense': 'Расход',
    'Apply payment': 'Провести платеж',
    'Clients debt ': 'Долг клиента ',
    'Client debt': 'Расчеты с клиентом',
    'Document': 'Документ',
    'Sale': 'Продажа',
    'Cash flow': 'Движение денег',
    'Cashbox/Document': 'Касса/счет / Документ',
    'Login': 'Вход',
    'Registration': 'Регистрация',
    'Register': 'Зарегистрироваться',
    'Forgot your password?': 'Забыли пароль?',
    'Confirm password': 'Подтвердите пароль',
    'Your name': 'Ваше имя',
    'Go to authorization': 'Перейти к авторизации',
    'Password recovery': 'Восстановление пароля',
    'Recover password': 'Восстановить пароль',
    'Your account has been created.': 'Ваш аккаунт создан!',
    'Discount sum': 'Сумма скидки',
    'Agent': 'Агент',
    'Status': 'Статус',
    'New': 'Новый',
    'Assigned': 'Назначен',
    'Completed': 'Завершен',
    'To agent': 'Агенту',
    'Payment to agent': 'Платеж агенту',
    'Unassigned orders': 'Свободные заказы',
    'My orders': 'Мои заказы',
    'Take order': 'Принять заказ',
    'Consist': 'Состав',
    'Money received \nOrder completed': 'Деньги получены\nЗаказ выполнен',
    'Received': 'Получено',
    'Fill by agent': 'Заполнить по агенту',
    'System': 'Система',
    'Agent app': 'Приложение агента',
    'Settings': 'Настройки',
    'Print': 'Печать',
    'Start': 'На начало',
    'Increase': 'Увеличение',
    'Decrease': 'Уменьшение',
    'Details': 'Детали',
    'Card payment': 'Оплата картой',
    'Terminal': 'Терминал',
    'Available to agent': 'Доступен агенту',
    'Order dynamics': 'Динамика заказов',
    'Create': 'Создать',
    'Yesterday': 'Вчера',
    'Today': 'Сегодня',
    'Tomorrow': 'Завтра',
    'Prev week': 'Пред неделя',
    'This week': 'Эта неделя',
    'Next week': 'След неделя',
    'Clients sales': 'Продажи клиенту',
    'Sales count': 'Количество продаж',
    'Sales sum': 'Сумма продаж',
    'Sales average sum': 'Средний чек',
    'Profile': 'Профиль',
    'Your email (username)': 'Ваш email (логин)',
    'Name': 'Имя',
    'Passwords match': 'Пароли совпадают',
    'Passwords do not match': 'Пароли не совпадают',
    'Dashboard': 'Рабочий стол',
    'Price lists': 'Цены',
    'PriceList': 'Прайс-лист',
    'Import': 'Импорт',
    'Entity': 'Справочник',
    'Months count': 'Кол-во месяцев',
    'Pay': 'Оплатить',
    'Your tariff: ': 'Ваш тариф: ',
    '. Ends at: ': '. Заканчивается: ',
    'Search (name or email)': 'Поиск (имя или почта)',
    'All': 'Все',
    'Active': 'Активные',
    'Inactive': 'Неактивный',
    'Manager': 'Менеджер',
    'Limits': 'Ограничения',
    'current month': 'текущий месяц',
    'Account quota exceeded!': 'Квота аккаунта превышена!',
    'Money': 'Деньги',
    'Reports': 'Отчеты',
    'Price types': 'Типы цен',
    'Price type': 'Тип цен',
    'Receipts': 'Поступления',
    'Receipt': 'Поступление',
    'Contractor': 'Контрагент',
    'Product flow': 'Движение товаров',
    'Account balances': 'Учитывать остатки',
    'Company name': 'Название компании',
    'Detail to document': 'Детализировать до документа',
    'User with this e-mail already exist': 'Пользователь с таким e-mail уже существует',
    'Password reset': 'Сброс пароля',
    'Set new password': 'Установить новый пароль',
    'Account activation': 'Активация',
    'Activation code': 'Код активации',
    'Account': 'Учетная запись',
    'Activate': 'Активировать',
    'User inactive!': 'Учетная запись не активирована! Проверьте почту!',
    'Debt flow': 'Взаиморасчеты',
    'Client/Document': 'Клиент/Документ',
    'Client debts': 'Долги клиентов',
    'Product card': 'Карточка товара',
    'Rest: ': 'Остаток: ',
    'Deals': 'Сделки',
    'Deal': 'Сделка',
    'Tasks': 'Задачи',
    'Task': 'Задачa',
    'New Task': 'Новая задачa',
    'Triggers': 'Триггеры',
    'Trigger': 'Триггер',
    'Extra fields lists': 'Дополнительные поля',
    'Extra fields  lists': 'Доп. поля',
    'Extra fields list': 'Список дополнительных полей',
    'Entity name': 'Сущность',
    'Fields list': 'Список полей',
    'Condition entity': 'Сущность источник',
    'Condition': 'Условие',
    'Action entity': 'Целевая сущность',
    'Action entity uuid': 'Целевой uuid (необязательно)',
    'Action entity fields': 'Поля целевой сущности',
    'Field': 'Поле',
    'Values': 'Значение',
    'Salesman': 'Специалист по продажам',
    'Contacts': 'Контакты',
    'Contact': 'Контакт',
    'Schemas': 'Схемы',
    'Schema': 'Схема',
    'Steps': 'Шаги',
    'Step': 'Шаг',
    'by': 'от',
    'at': 'из',
    'Do Comment': 'Комментировать',
    'Add Task': 'Добавить задачу',
    'On date': 'На дату',
    'for': 'для',
    'New Deal': 'Новая сделка',
    'List': 'Список',
    'Borad': 'Доска'
  }, _defineProperty(_objectSpread2, "Order", 'Продажа'), _defineProperty(_objectSpread2, "Orders", 'Продажи'), _defineProperty(_objectSpread2, 'Sale schemas', 'Схемы продаж'), _defineProperty(_objectSpread2, 'Sale schema', 'Схема продаж'), _defineProperty(_objectSpread2, 'Default schema', 'Схема по умолчанию'), _defineProperty(_objectSpread2, 'Expired', 'Просрочено'), _defineProperty(_objectSpread2, 'Day After Tomorrow', 'Послезавтра'), _defineProperty(_objectSpread2, 'Later', 'Позже'), _defineProperty(_objectSpread2, 'Print templates', 'Шаблоны печати'), _defineProperty(_objectSpread2, 'Print template', 'Шаблон печати'), _defineProperty(_objectSpread2, 'Hide Done', 'Скрыть выполненные'), _defineProperty(_objectSpread2, 'Step index', 'Шаг'), _defineProperty(_objectSpread2, 'Deal closed', 'Сделка закрыта'), _defineProperty(_objectSpread2, 'Hide Closed', 'Скрыть закрытые'), _defineProperty(_objectSpread2, 'Board', 'Доска'), _defineProperty(_objectSpread2, 'Closed', 'Закрыто'), _defineProperty(_objectSpread2, 'Basic', 'Базовые'), _defineProperty(_objectSpread2, 'Company inn', 'ИНН'), _defineProperty(_objectSpread2, 'Company kpp', 'КПП'), _defineProperty(_objectSpread2, 'Company bank name', 'Название банка'), _defineProperty(_objectSpread2, 'Company bank code', 'БИК'), _defineProperty(_objectSpread2, 'Company bank corr account', 'Корр. счет'), _defineProperty(_objectSpread2, 'Company bank account', 'Номер счета'), _defineProperty(_objectSpread2, 'To Client', 'К Клиенту'), _defineProperty(_objectSpread2, 'Invoices', 'Счета'), _defineProperty(_objectSpread2, 'Invoice', 'Счет'), _objectSpread2))
};
var _default = translate;
exports.default = _default;