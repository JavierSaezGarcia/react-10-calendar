
import { calendarSlice, onAddNewEvent, onDeleteEvent, onUpdateEvent, onSetActiveEvent, onLoadEvents, onLogoutCalendar } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";


describe('Test in calendarSlice', () => {

    test('should return the initial state', () => {

        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);

    });

    test('onSetActiveEvent should change the activeEvent', () => {

        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]))
        console.log(state);
        expect(state.activeEvent).toEqual(events[0]);

    });

    test('onAddNewEvent should add a new event', () => {
    
        const newEvent = {
            id: '4',
            start: new Date('2023-07-24 13:00:00'),             
            end: new Date('2023-07-24 15:00:00'),   
            title: "Cumpleaños del Aleth",  // obligatorio
            notes: "Una nota adicional",  // opcional     
        }
        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
        expect(state.events).toEqual([...events, newEvent]);

    });

    test('onUpdateEvent should update an event', () => {
    
        const updatedEvent = {
            id: '1',
            start: new Date('2023-07-24 13:00:00'),             
            end: new Date('2023-07-24 15:00:00'),   
            title: "Cumpleaños del Aleth",  // obligatorio
            notes: "Una nota adicional",  // opcional     
        }
        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));
        expect(state.events[0]).toEqual(updatedEvent);         
        expect(state.events).toContain(updatedEvent);       

    });

    test('onDeleteEvent should delete an active event', () => {

        const state = calendarSlice.reducer( calendarWithActiveEventState ,onDeleteEvent());        
        expect(state.activeEvent).toBeNull();
        expect(state.events).not.toContain(events[0]); // porque dijimos en el fixture  que el activo era el evento 0
    });

    test('onLoadEvents should load an event', () => {
       
        const state = calendarSlice.reducer(initialState, onLoadEvents(events));
        expect(state.isLoadingEvents).toBeFalsy();
        expect(state.events).toEqual(events);

        calendarSlice.reducer(initialState, onLoadEvents(events));
        expect(state.events.length).toBe(events.length);
       
    });
    test('onLogoutCalendar should clean the state', () => {
       
        const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar());
        expect(state).toEqual(initialState);

    });

    





})