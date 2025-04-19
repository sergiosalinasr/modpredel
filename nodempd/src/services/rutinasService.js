const fs = require('fs');
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

importarDesdeJSON = async () => {
  try {
    const data = JSON.parse(fs.readFileSync('./src/postman/tdu_carga.json', 'utf8'));

    for (const entry of data) {
      const tduData = entry.tdu;

      // Crear TDU
      //console.log(`✔ TDU creando: tduData.nombreCorto=${tduData.nombreCorto}`);
      const nuevo = await tduService.crearTDU({
        nombreCorto: tduData.nombreCorto,
        descripcionLarga: tduData.descripcionLarga,
        id_modulo: 1,
        id_tipo: 1,
        id_estado: 1,
        id_expreg_nombrecorto: 1,
        id_expreg_desclarga: 1
      });
      //const tduResponse = await axios.post(`${BASE_URL}/tdu`, tduData);
      const newTdu = nuevo.data;

      console.log('TDU insertado:', nuevo);

      // Crear CDUs asociadas
      
      for (const cdu of entry.cdus) {
        // Sobrescribe id_tdu por el nuevo id del TDU creado
        console.log('TDU insertado nuevo.id: ' + nuevo.id, " cdu.nombreCorto: " + cdu.nombreCorto);
        /*const cduData = {
          ...cdu,
          id_tdu: nuevo.id
        };
        */
        //await axios.post(`${BASE_URL}/cdu`, cduData);
        //console.log(`  ➤ CDU creado: ${cduData.nombreCorto}`);
      }
      
    }

    console.log('✅ Todos los datos han sido importados correctamente.');
  } catch (error) {
    console.error('❌ Error durante la importación:', error.response?.data || error.message);
  }
}

module.exports = { iniciarCargas, importarDesdeJSON };