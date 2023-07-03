import calendarApi from "../../src/api/calendarApi";

describe('Test in calendarApi', () => { 
    test('should has default config', () => { 
        // console.log(calendarApi);       
        expect( calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
    });


    test('should has a x-token in all requests', async() => {
        const token = 'ABC-123-XYZ';
        localStorage.setItem('token', token);
        const res = await calendarApi.get('/auth');        
        // console.log(res.config.headers['x-token']);
        expect(res.config.headers['x-token']).toBe(token);
        
    });

});