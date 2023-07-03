import { act, renderHook } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { useUIStore } from "../../src/hooks/useUIStore";
import { Provider } from "react-redux";
import { uiSlice } from "../../src/store";


const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: {...initialState }
        }
    })
}

describe('Test in useUiStore', () => {

    test('should return default values', () => {

        const mockStore = getMockStore({ isDateModalOpen: false })

        const { result } = renderHook(() => useUIStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{children}</Provider>                 
        });
        // console.log( result.current);

        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),        
            toggleDateModal: expect.any(Function)            
        })

    });

    test('openDateModal should change isDateModalOpen to true', () => {

        const mockStore = getMockStore({ isDateModalOpen: false })

        const { result } = renderHook(() => useUIStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{children}</Provider>                 
        });

        const { openDateModal } = result.current;

        act( () => { // act es para que se ejecute el codigo dentro de la funcion
            openDateModal(); // ejecutamos la funcion
        });
       

        expect(result.current.isDateModalOpen).toBeTruthy();   
        
    });

    test('closeDateModal should change the state to false', () => {
        
        const mockStore = getMockStore({ isDateModalOpen: true })

        const { result } = renderHook(() => useUIStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{children}</Provider>                 
        });

        const { closeDateModal } = result.current;
        

        act( () => { // act es para que se ejecute el codigo dentro de la funcion
           closeDateModal(); // ejecutamos la funcion
        });        

        expect(result.current.isDateModalOpen).toBeFalsy();   
        
    
    });

    test('toggleDateModal should change isDateModalOpen to true', () => {
        
        const mockStore = getMockStore({ isDateModalOpen: false })
        
        const { result } = renderHook(() => useUIStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{children}</Provider>                 
        });  
        
        console.log(result.current);
        // ejecutamos la funcion y el isDateModalOpen: false lo convertira en true
        act( () => { // act es para que se ejecute el codigo dentro de la funcion
            result.current.toggleDateModal(); // ejecutamos la funcion
            
        });       
        console.log(result.current);
        expect(result.current.isDateModalOpen).toBeTruthy();   
        

        // ejecutamos la funcion y el isDateModalOpen: true lo convertira en false 
        act( () => { // act es para que se ejecute el codigo dentro de la funcion
            result.current.toggleDateModal(); // ejecutamos la funcion
            
        });       
        console.log(result.current);
        expect(result.current.isDateModalOpen).toBeFalsy();   
        
    
    
    })
})