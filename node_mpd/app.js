const express = require('express');
const sequelize = require('./config');
const tduRoutes = require('./routes/tduRoutes');
const cduRoutes = require('./routes/cduRoutes');

const app = express();
app.use(express.json());

// Rutas
app.use('/tdu', tduRoutes);
app.use('/cdu', cduRoutes);

// Conexión a la base de datos
sequelize.sync().then(() => {
    console.log('Database connected');
    app.listen(3000, () => console.log('Server is running on port 3000'));
}).catch(error => {
    console.error('Error: La Database no está disponible');
    console.error(error.message || error);
    console.error('Error: La Database no está disponible');
    process.exit(1); // Cierra el proceso si la base de datos no está disponible
});

