
import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider } from 'react-redux';
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store";
import { authenticatedState, initialState, notAuthenticatedState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";
import { calendarApi } from "../../src/api";



const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}



describe('Tests in useAuthStore', () => {

    beforeEach(() => localStorage.clear());

    test('should return default values', () => {
        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (<Provider store={mockStore}> {children} </Provider>)
        });


        //  console.log(result.current);
        expect(result.current).toEqual({
            status: 'checking', // 'checking-credentials', 'authenticated', 'not-authenticated'
            user: {},
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function),

        });

    });

    test('startLogin should make login correctly', async () => {


        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (<Provider store={mockStore}> {children} </Provider>)
        });
        // console.log(result.current);

        await act(async () => {
            await result.current.startLogin(testUserCredentials);
        });
        // console.log(result.current);

        const { errorMessage, status, user } = result.current;
        expect(result.current.status).toBe('authenticated');
        expect(result.current.errorMessage).toBe(undefined);

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '649bf107fb4a0357d2108661' }
        });

        expect(localStorage.getItem('token')).toBeTruthy();
        expect(localStorage.getItem('token')).toEqual(expect.any(String));
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));

    });

    test('startLogin should fail', async () => {


        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (<Provider store={mockStore}> {children} </Provider>)
        });
        // console.log(result.current);

        await act(async () => {
            await result.current.startLogin({ email: 'algo@gmail.com', password: '123456789' }); // credenciales incorrectas
        });

        const { errorMessage, status, user } = result.current;
        expect(errorMessage).toBe('Credenciales incorrectas');
        expect(errorMessage).toEqual(expect.any(String));
        expect(status).toBe('not-authenticated');
        expect(user).toEqual({});
        expect(localStorage.getItem('token')).toBeNull();

        await waitFor(() => { // waitFor se usa para esperar que se ejecute el codigo y lo obtenemos de la libreria testing-library de react
            expect(result.current.errorMessage).toBe(undefined);
        });

    });

    test('startRegister should make register correctly', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState });

        const newUser = { email: 'algo@gmail.com', password: '123456789', name: 'Test User 2' };

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (<Provider store={mockStore}> {children} </Provider>)
        });

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({ // SIRVE PARA SIMULAR UN POST QUE NO LLEGA A LA BD
            data: {
                ok: true,
                uid: '1263781293',
                name: 'Test User',
                token: 'ALGUN-TOKEN'
            }
        });

        await act(async () => {
            await result.current.startRegister(newUser);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '1263781293' }
        });

        spy.mockRestore(); // esto destruye el espia para que en otra prueba pueda realizar un post


    });

    test('startRegister should fail', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (<Provider store={mockStore}> {children} </Provider>)
        });

        await act(async () => {
            await result.current.startRegister(testUserCredentials);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'El usuario ya existe con ese email',
            status: 'not-authenticated',
            user: {}
        });
    });

    test('checkAuthToken should fail if there is no token', async () => {

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (<Provider store={mockStore}> {children} </Provider>)
        });
        console.log('token ', localStorage.getItem('token'));
        await act(async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        });
    
    });

    test('checkAuthToken should authenticate correctly if is there a token', async () => {

        const { data } = await calendarApi.post('/auth', testUserCredentials);
        console.log(data);
        localStorage.setItem('token', data.token);

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (<Provider store={mockStore}> {children} </Provider>)
        });

        await act(async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;
        console.log({ errorMessage, status, user });

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '649bf107fb4a0357d2108661' }
        });

    });

    test('startLogout should clear the token', () => {

        const mockStore = getMockStore({ ...authenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (<Provider store={mockStore}> {children} </Provider>)
        });
        console.log('Estado antes de la accion',result.current);
        act( () => {
            result.current.startLogout();
        });

        const { errorMessage, status, user } = result.current;
        console.log('estado haciendo logout',{ errorMessage, status, user });
        expect(localStorage.getItem('token')).toBeNull();
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        });
        

    });

       

    

});



