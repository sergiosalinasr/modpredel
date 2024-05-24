const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/userRoutes');
const config = require('./config');
const { login, createUser, checkUserExists } = require('./services/authService');  // Asegúrate de que la ruta al módulo authService sea correcta

const app = express();

// Aplica el middleware CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());


// por ahora, sólo un Healthy!
app.get('/', (req, res) => {
    res.send('¡Node: Healthy!');
});


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


app.post('/SignUp', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    // Primero, verificar si el usuario ya existe
    const userExists = await checkUserExists(username); // Esta función necesita ser implementada o integrada
    console.error('Node: en index.js, volviendo del checkUserExists: ' + userExists);
    if (userExists) {
      return res.status(409).json({ error: 'User already exists.' });
    }

    // Crear el usuario
    const createUserResponse = await createUser(username, password);
    if (createUserResponse.status === 201) {
      res.status(201).json({ message: 'User created successfully.', userId: createUserResponse.id });
    } else {
      throw new Error('Failed to create user');
    }
  } catch (error) {
    console.error('SignUp Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


app.listen(config.port, () => {
    console.log(`Node: Servidor corriendo en http://localhost:${config.port}`);
});

module.exports = app; // Para pruebas y flexibilidad adicional

