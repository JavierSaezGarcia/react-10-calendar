
// TODO testear que checkAuthToken haya sido llamado
// TODO testear qiue el estado sea checking

import { fireEvent, render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";


jest.mock('../../src/hooks/useAuthStore');
jest.mock('../../src/calendar', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}));


describe('Test in <AppRouter />', () => {

    const mockCheckAuthToken = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('should display loading screen and checkAuthToken has been called ', async () => {

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken

        });
        render(<AppRouter />);
        // screen.debug();

        expect(screen.getByText('Loading...')).toBeTruthy();
        expect(mockCheckAuthToken).toHaveBeenCalled();
    });

    test('should display login screen when user is not logged in', () => {

        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        const { container } = render(

            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>

        );
        //screen.debug();

        expect(screen.getByText('Ingreso')).toBeTruthy();
        expect(container).toMatchSnapshot();
    });

    test('should display calendar screen when user is logged in', () => {
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );
        screen.debug();
        expect(screen.getByText('CalendarPage')).toBeTruthy();

    })




});