
export const CalendarEvent = ({ event }) => {

    const { title, user, notes } = event;

    return (
        <>
         <strong>{ title } - </strong>
         <strong>{ notes } - </strong>         
         <span>{ user.name }</span>
       
        </>
    )
}
