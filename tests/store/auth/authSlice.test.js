
import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, checkingCredentialsState, initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe('Tests in authSlice', () => {
    test('should return initial state', () => {

        expect(authSlice.getInitialState()).toEqual(initialState);


    });

    test('should log in', () => {

        const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        });

    });
    test('should log out', () => {

        const state = authSlice.reducer(authenticatedState, onLogout());
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        });

    });
    test('should log out', () => {
        const errorMessage = 'Credenciales no válidas';
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        });

    });
    test('should onChecking', () => {
        const state = authSlice.reducer(checkingCredentialsState, onChecking());
        expect(state).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined
        });

    });

    test('should clear error messaget', () => {
        const errorMessage = 'Credenciales no válidas';
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        const newState = authSlice.reducer(state, clearErrorMessage());
        expect(newState.errorMessage).toBeUndefined();

    });




});




