import { addHours } from "date-fns";
import { useCalendarStore, useUIStore } from "../../hooks"


export const FabAddNew = () => {

    const { openDateModal }  = useUIStore();    
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
            _id: new Date().getTime(),
            title: "",  // obligatorio
            notes: "",  // opcional
            start: new Date(),              // obligatorio
            end: addHours(new Date(), 2),   // obligatorio
            bgColor: "#e74c3c",             // opcional
            user: {
              _id: '',
              name: ''
            }
        })
        openDateModal();
    }


    return (
        <button
            className="btn btn-primary fab"
            onClick={handleClickNew}
        ><i className="fas fa-plus"></i>
        </button>
    )
}
