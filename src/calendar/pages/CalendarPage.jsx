import { Calendar } from 'react-big-calendar';
import { localizer, getMessagesES } from '../../helpers/';
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from "../";
import { useState } from 'react';
import { useCalendarStore, useUIStore } from '../../hooks';


import 'react-big-calendar/lib/css/react-big-calendar.css';







export const CalendarPage = () => {

  const { openDateModal } = useUIStore();

  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log(event, start, end, isSelected);  
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: 'white'

    }
    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    // console.log( {doubleClick: event} );
    openDateModal();
  }

  const onSelect = (event) => {
    // console.log({ click: event });
    setActiveEvent(event);
  }

  const onViewChange = (event) => {
    console.log({ viewChanged: event });
    localStorage.setItem('lastView', event);
  }


  return (
    <>
      <NavBar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)', backgroundColor: '#fafafa' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick} // representa un doble click en un evento        
        onSelectEvent={onSelect} // representa un click en un event
        onView={onViewChange} // representa cambio de vista
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />

    </>
  )


}
