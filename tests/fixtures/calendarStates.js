

export const events = [
    {
        id: '1',
        start: new Date('2023-07-23 13:00:00'),             
        end: new Date('2023-07-23 15:00:00'),   
        title: "Cumpleaños del Javier",  // obligatorio
        notes: "Una nota adicional",  // opcional      
    },
    {
        id: '2',
        start: new Date('2023-07-24 13:00:00'),             
        end: new Date('2023-07-24 15:00:00'),   
        title: "Cumpleaños del Aleth",  // obligatorio
        notes: "Una nota felicitación",  // opcional      
    },
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
}   
export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null,
}   
export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: {...events[0]},
}   