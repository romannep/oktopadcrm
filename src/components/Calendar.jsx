import React, { Component } from 'react';
import moment from 'moment';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import './Calendar.scss';

const localizer = momentLocalizer(moment);
const BigCalendarDND = withDragAndDrop(BigCalendar);

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
  showMore: e => `+${e} еще`,
};

export default class Calendar extends Component {
  id = 2;
  state = {
    events: [
      {
        id: 1,
        start: moment().toDate(),
        end: moment().add(2, 'hour').toDate(),
        title: 'Some title',
      },
    ],
  };

  onEventResize = (data) => {
    const { start, end, event } = data;
    event.start = start;
    event.end = end;

    this.setState((state) => {
      return { events: [...state.events] };
    });
  };

  onEventDrop = (data) => {
    const { start, end, event } = data;
    event.start = start;
    event.end = end;

    this.setState((state) => {
      return { events: [...state.events] };
    });
  };

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title) {
      this.setState({
        events: [
          ...this.state.events,
          {
            id: ++this.id,
            start,
            end,
            title,
          },
        ],
      });
    }
  };

  eventPropGetter = (event, start, end, isSelected) => {
    const newStyle = {
      backgroundColor: isSelected ? '#08b2c3' : '#088596',
      borderColor: '#088596',
    };
    return {
      style: newStyle,
    };
  };

  render() {
    return (
      <div style={containerStyle}>
        <BigCalendarDND
          defaultDate={moment().toDate()}
          defaultView='week'
          events={this.state.events}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          selectable
          localizer={localizer}
          messages={messages}
          onSelectEvent={event => console.log(event.title)}
          onSelectSlot={this.handleSelect}
          eventPropGetter={this.eventPropGetter}
        />
      </div>
    );
  }
}
