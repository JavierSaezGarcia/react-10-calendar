import { useSelector, useDispatch } from "react-redux";
import { calendarApi } from "../api";
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store";
import Swal from 'sweetalert2';
import { convertEventsToDateEvents } from "../helpers";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);    

    const { user } = useSelector(state => state.auth);


    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
       
        try {
            if (calendarEvent.id) {
                // Actualizando
                console.log('Actualizando Event');
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;

            }
           
            calendarEvent.user = user.uid;
            // console.log('este es el calendar event que guardo despues:', calendarEvent);
            const { data } = await calendarApi.post('/events', calendarEvent );
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );          



        } catch (error) {
            //  console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }

    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent(activeEvent._id))
    }

    const startLoadingEvents = async () => {
        try {

            const { data } = await calendarApi.get('/events');
            // console.log({ data });
            const events = convertEventsToDateEvents(data.events);
            console.log(events);
            dispatch(onLoadEvents(events));

        } catch (error) {
            console.log('Cargando eventos');
            console.log(error);
        }
    }

    return {
        //! Propiedades
        events,
        activeEvent,
        hasActiveEvent: !!activeEvent,

        //! Metodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents
    }
}
