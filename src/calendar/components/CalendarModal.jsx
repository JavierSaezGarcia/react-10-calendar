import { useMemo, useState, useEffect } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Modal from 'react-modal';

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
import { useCalendarStore, useUIStore } from "../../hooks";


registerLocale('es', es);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');


export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUIStore();

    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [formSubmitted, setformSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const titleClass = useMemo(() => {
        // el valor de titleClass solo se va a memorizar si el titulo cambia o si formSubmitted cambia
        if (!formSubmitted) return '';

        return (formValues.title.length > 0)
            ? ''
            : 'is-invalid';

    }, [formValues.title, formSubmitted]);

    useEffect(() => {
      if( activeEvent !== null ) {
        setFormValues({ ...activeEvent });
      }    
    }, [activeEvent ])
    

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        });
    }

    const onCloseModal = () => {
        // console.log('cierro modal');
        closeDateModal();

    }

    const onSubmit = async(event) => {
        event.preventDefault();
        setformSubmitted(true);
        const difference = differenceInSeconds(formValues.end, formValues.start);
        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Error', 'Fechas incorrectas, Revisa las fechas', 'error');
            return;
        }
        if (formValues.title.length <= 0) return;

        // TODO:
        // Remover errores ehn pantalla
        // Cerrar modal
        
        await startSavingEvent( formValues ); 
        closeDateModal();
        setformSubmitted(false);
    }


    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }>
            <h1> Nuevo evento </h1>
            <hr />
            <form onSubmit={onSubmit} >
                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label><br />
                    <DatePicker
                        className="form-control"
                        selected={formValues.start}
                        onChange={(event) => onDateChanged(event, 'start')}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                        

                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label><br />
                    <DatePicker
                        className="form-control"
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={(event) => onDateChanged(event, 'end')}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"

                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChanged}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Escribe las anotaciones"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChanged}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary">
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
