import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { onChecking, onLogin, onLogout, clearErrorMessage, onLogoutCalendar, } from "../store";
import Swal from 'sweetalert2';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // ahora realizaremos el prpceso de login ( asincrono) porque llega al backend
    const startLogin = async ({ email, password }) => {

        dispatch(onChecking());
        try {

            const { data } = await calendarApi.post('/auth', { email, password });
            // console.log(data.token);
            // console.log(data.name);
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        }
        catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }

    }

    const startRegister = async ({ email, password, name }) => {
        dispatch(onChecking());

        try {
            const { data } = await calendarApi.post('/auth/new', { email, password, name });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
            Swal.fire('Registro correcto', `Bienvenido ${data.name}`, 'success');
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || 'Informacion invalida, intente de nuevo'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }

    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout());
    }

    return {
        //* PROPIEDADES
        status,
        user,
        errorMessage,
        //* METODOS
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}

