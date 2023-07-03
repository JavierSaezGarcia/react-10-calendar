import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice";


describe('Testings for uiSlice', () => {
    test('should return the initial state by default', () => {

        // console.log(uiSlice.getInitialState());
        expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
    });

    test('should change the state with onOpenDateModal to be true', () => {
        let state = uiSlice.getInitialState();
        // onOpenDateModal()
        state = uiSlice.reducer(state, onOpenDateModal());
        expect(state.isDateModalOpen).toBeTruthy();

        // onCloseDateModal()
        state = uiSlice.reducer(state, onCloseDateModal());
        expect(state.isDateModalOpen).toBeFalsy();
    });
   
})