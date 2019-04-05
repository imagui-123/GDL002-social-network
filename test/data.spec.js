// require('../src/data.js');

require('../src/auth.js');
require('../src/index.js');


describe('Mostrar registro de usuario', () => {
    it('Debería mostrar cuando se registra un usuario', () => {
      return registerUser('usuario@email.com', 12345678).then((email, password)=>{
        expect(email, password).toBe('usuario@email.com', 12345678);
      });
    });