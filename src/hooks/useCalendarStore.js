import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvents
} from "../store";




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
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }

            // Creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));



        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }

    }

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent())
        } catch (error) {
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');

        }



    }

    const startLoadingEvents = async () => {
        try {

            const { data } = await calendarApi.get('/events');
            // console.log({ data });
            const events = convertEventsToDateEvents(data.events);
            // console.log(events);
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
