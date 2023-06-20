import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: "Cumpleaños del jefe",  // obligatorio
    notes: "necesito un presente",  // opcional
    start: new Date(),              // obligatorio
    end: addHours(new Date(), 2),   // obligatorio
    bgColor: "#347CF7",             // opcional
    user: {
      _id: "123",
      name: "Javier Sáez"
    }
  }

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [ tempEvent ],
    activeEvent: null
  },
  reducers: {
    onSetActiveEvent: ( state, { payload } ) => {
      state.activeEvent = payload;    
      // console.log(payload);
    },
    onAddNewEvent: ( state, { payload } ) => {
      state.events.push( payload );
      state.activeEvent = null;
    
      // console.log(payload);
    },
    onUpdateEvent: ( state, { payload } ) => {
      state.events = state.events.map( event => {
        if ( event._id === payload._id ) {
          return payload;
        }
        return event;
        
       
      });
    },
    onDeleteEvent: ( state ) => { 
      if(state.activeEvent){
        state.events = state.events.filter( event => event._id !== state.activeEvent._id );
        state.activeEvent = null;
      }
      
    }
  }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions
