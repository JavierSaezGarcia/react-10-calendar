import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// const tempEvent = {
//     _id: new Date().getTime(),
//     title: "Cumpleaños del jefe",  // obligatorio
//     notes: "necesito un presente",  // opcional
//     start: new Date(),              // obligatorio
//     end: addHours(new Date(), 2),   // obligatorio
//     bgColor: "#347CF7",             // opcional
//     user: {
//       _id: "6492c138ae7daf8b7ac63f5b",
//       name: "Javier Evelio"
//     }
//   }

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvents: true,
    events: [ 
     // tempEvent
    ],
    activeEvent: null
  },
  reducers: {

    onSetActiveEvent: ( state, { payload } ) => {
      state.activeEvent = payload;    
      // console.log(payload);
    },
    onAddNewEvent: ( state, { payload }) => {
      state.events.push( payload );
      state.activeEvent = null;
    },
    onUpdateEvent: ( state, { payload } ) => {
      
      state.events = state.events.map( event => {
        if ( event.id === payload.id ) {
            return payload;
        }
       
        return event;
       });
    },
    onDeleteEvent: ( state ) => { 
      if(state.activeEvent){
        state.events = state.events.filter( event => event.id !== state.activeEvent.id );
        state.activeEvent = null;
      }
      
    },
    onLoadEvents: ( state, { payload = [] } ) => {
      state.isLoadingEvents = false;
      // state.events = payload;
      payload.forEach( event => {
        // se utiliza some() porque si encuentra predicado con las caracteristicas da un true
        const exists = state.events.some( dbEvent => dbEvent.id === event.id );
        if(!exists){
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: ( state ) => {  
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    }


  }
  
});

export const { 
    onSetActiveEvent, 
    onAddNewEvent, 
    onUpdateEvent, 
    onDeleteEvent, 
    onLoadEvents,
    onLogoutCalendar
  } = calendarSlice.actions
