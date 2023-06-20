import { useSelector, useDispatch } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        // TODO llegar al backend

        // Si esta todo bien
        if(calendarEvent._id){
            // Actualizar
            dispatch( onUpdateEvent({ ...calendarEvent }));
        }
            // Crear
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) )       
    
    }

    const startDeletingEvent = () => {
        dispatch( onDeleteEvent( activeEvent._id ) )
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
    }
}
