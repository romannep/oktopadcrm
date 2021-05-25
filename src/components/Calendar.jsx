import React, { Component } from 'react';
import moment from 'moment';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

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
  showMore: e => `+ ${e} подробней`,
};

export default class Calendar extends Component {
  state = {
    events: [
      {
        start: moment().toDate(),
        end: moment().add(2, 'hour').toDate(),
        title: 'Some title',
      },
    ],
  };

  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: [...state.events] };
    });
  };

  onEventDrop = (data) => {
    console.log(data);
  };

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      });
  };

  // handleDragStart = event => {
  //   this.setState({ draggedEvent: event });
  // };
  //
  // dragFromOutsideItem = () => {
  //   return this.state.draggedEvent;
  // };
  //
  // onDropFromOutside = ({ start, end, allDay }) => {
  //   const { draggedEvent } = this.state;
  //
  //   const event = {
  //     id: draggedEvent.id,
  //     title: draggedEvent.title,
  //     start,
  //     end,
  //     allDay: allDay,
  //   };
  //
  //   this.setState({ draggedEvent: null })
  //   this.moveEvent({ event, start, end })
  // };

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
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
        />
      </div>
    );
  }
}
