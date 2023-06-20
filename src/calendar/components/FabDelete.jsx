
import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {

    const { startDeletingEvent, hasActiveEvent } = useCalendarStore();

    const handleDelete = () => {
        startDeletingEvent();
    }


    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
            style={{ display: hasActiveEvent ? '' : 'none' }}
        ><i className="fas fa-trash-alt"></i>
        </button>
    )
}
