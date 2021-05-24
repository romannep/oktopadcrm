import React, { Component } from 'react';
import moment from 'moment';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const containerStyle = {
  height: '80vh',
};

const messages = {
  date: 'Дата',
  time: 'Время',
  event: 'Занятие',
  allDay: 'Целый день',
  week: 'Неделя',
  work_week: 'Рабочая неделя',
  day: 'День',
  month: 'Месяц',
  previous: 'Назад',
  next: 'Вперед',
  yesterday: 'Вчера',
  tomorrow: 'Завтра',
  today: 'Сегодня',
  agenda: 'Агенда',
  noEventsInRange: 'Нет занятий в выбранном периода',
  showMore: e => `+ ${e} подробней`,
};

export default class Calendar extends Component {
  render() {
    return (
      <div style={containerStyle}>
        <BigCalendar
          localizer={localizer}
          messages={messages}
          events={[]}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    );
  }
}
