const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/userRoutes');
const config = require('./config');

const app = express();

app.use(express.json()); // Middleware para parsear JSON

// Desahabilitado hasta que conecte una Base de Datos mongodb
/* mongoose.connect(config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conexión a MongoDB establecida"))
    .catch(err => console.log(err));

app.use('/api', userRoutes);
*/

// por ahora, sólo un HOLA MUNDO
app.get('/', (req, res) => {
    res.send('¡HOLA MUNDO!');
});


app.listen(config.port, () => {
    console.log(`Servidor corriendo en http://localhost:${config.port}`);
});

module.exports = app; // Para pruebas y flexibilidad adicional

