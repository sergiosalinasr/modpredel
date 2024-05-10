const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/userRoutes');
const config = require('./config');
const { login } = require('./services/authService');  // Asegúrate de que la ruta al módulo authService sea correcta


const app = express();

// Aplica el middleware CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Desahabilitado hasta que conecte una Base de Datos mongodb
/* mongoose.connect(config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conexión a MongoDB establecida"))
    .catch(err => console.log(err));

app.use('/api', userRoutes);
*/

// por ahora, sólo un HOLA MUNDO
app.get('/', (req, res) => {
    res.send('¡HOLA MUNDO desde node backend! Keycloak:');
});

// desde ChatGPT:

// Ruta POST para manejar el login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    //console.error('Node: Entramos a /login:', username, password);
    if (!username || !password) {
        return res.status(400).json({ message: 'Node: Username and password are required.' });
    }
    //console.log('Node: Función login:', login);
    login(username, password)
        .then(token => {
            res.status(200).json({ access_token: token.access_token, token_type: token.token_type, expires_in: token.expires_in });
        })
        .catch(error => {
            console.error('Node: Login error:', error);
            if (error.response && (error.response.status === 400 || error.response.status === 401)) {
                res.status(error.response.status).json({ message: 'Node: Authentication failed. Check credentials.' });
            } else {
                res.status(500).json({ message: 'Node: Internal server error.' });
            }
        });
});

app.listen(config.port, () => {
    console.log(`Node: Servidor corriendo en http://localhost:${config.port}`);
});

module.exports = app; // Para pruebas y flexibilidad adicional

