const tduService = require('./tduService');

iniciarCargas = async () => {
    console.log("iniciarCargas: " )

    try {
        const nuevo = await tduService.crearTDU({
          nombreCorto: 'Inicial',
          descripcionLarga: 'Carga por JSON',
          createdAt: new Date(),
          updatedAt: new Date(),
          id_modulo: 1,
          id_tipo: 1,
          id_estado: 1,
          id_expreg_nombrecorto: 1,
          id_expreg_desclarga: 1
        });
    
        console.log('TDU insertado:', nuevo);
      } catch (err) {
        console.error('Error:', err.message);
      }

}

module.exports = { iniciarCargas };