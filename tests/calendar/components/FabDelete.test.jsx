
import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks";


jest.mock('../../../src/hooks/useCalendarStore');

describe('Test in <FabDelete />', () => {

    const mockStartDeletingEvent = jest.fn();

    beforeEach(() => jest.clearAllMocks());
    beforeEach(() => jest.clearAllTimers());
      
    test('should display correctly', () => {
        useCalendarStore.mockReturnValue({
            hasActiveEvent: false,
        });

        render( <FabDelete /> );
        const btn = screen.getByLabelText('btn-delete');
        // screen.debug();
        expect( btn ).toBeTruthy();
        expect( btn.classList ).toContain('btn-danger');    
        expect( btn.style.display ).toBe('none');
        

    });

    test('should display button when hasEventSelected is true', () => {

        useCalendarStore.mockReturnValue({
            hasActiveEvent: true,
        });

        render( <FabDelete /> );
        
        const btn = screen.getByLabelText('btn-delete');
        
         
        expect( btn.style.display).toBe('')
        
        

    });

    test('should call startDeletingEvent when clicked', () => {

        useCalendarStore.mockReturnValue({
            hasActiveEvent: true,
            startDeletingEvent: mockStartDeletingEvent,  
        });

        render( <FabDelete /> );
        
        const btn = screen.getByLabelText('btn-delete');
         
        fireEvent.click( btn ); // hacemos el evento click

        expect( mockStartDeletingEvent ).toHaveBeenCalled();       
        

    });

       

});