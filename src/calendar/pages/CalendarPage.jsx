import { useEffect, useState } from 'react';
import { useAuthStore, useCalendarStore, useUIStore } from '../../hooks';
import { Calendar } from 'react-big-calendar';
import { localizer, getMessagesES } from '../../helpers/';
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from "../";


import 'react-big-calendar/lib/css/react-big-calendar.css';







export const CalendarPage = () => {

  const { user } = useAuthStore();

  const { openDateModal } = useUIStore();

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log(event, start, end, isSelected);  
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
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

  const onViewChanged = (event) => {
    // console.log({ viewChanged: event });
    localStorage.setItem('lastView', event);
    setLastView( event )
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])
  


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
        onView={onViewChanged} // representa cambio de vista
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />

    </>
  )


}
