const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./logger');
const cookie = require('cookie'); // Si necesitas manipular cookies manualmente

//const userRoutes = require('./api/routes/userRoutes');
//const config = require('./config/index');
const { login, createUser, checkUserExists, refreshtoken, refreshTokenCookie } = require('./services/authService');  // Asegúrate de que la ruta al módulo authService sea correcta
require('dotenv').config();
const sequelize = require('./config');
const { getSecret, setSecret } = require('./services/vaultService');
const tduRoutes = require('./api/routes/tduRoutes');
const cduRoutes = require('./api/routes/cduRoutes');
//const usersRoutes = require("./api/routes/usersRoutes");
const leyRoutes = require("./api/routes/leyRoutes");
const delitoRoutes = require("./api/routes/delitoRoutes");
const riesgoRoutes = require("./api/routes/riesgoRoutes");
const cookieParser = require('cookie-parser');
const SECRET_KEY = 'mi_clave_secreta_super_segura_123!';
const { iniciarCargas } = require('./services/rutinasService');

// Validacion de access_token en cada API
const session = require('express-session');
const memoryStore = new session.MemoryStore();
const keycloak = require('./config/keycloak');


const app = express();

app.use(session({
  secret: 'some_secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Proteger rutas con Keycloak
if (!keycloak) {
  console.error("Keycloak instance is undefined.");
  process.exit(1);
}
app.use(keycloak.middleware());

//antes de definir tus rutas.
app.use(cookieParser()); // Habilitar el manejo de cookies

// Aplica el middleware CORS
//app.use(cors());
app.use(cors({
  origin: "http://localhost:4200", 
  credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas 
app.use('/tdu', tduRoutes);
app.use('/cdu', cduRoutes);

//app.use('/users', usersRoutes);
app.use('/ley', leyRoutes);
app.use('/delito', delitoRoutes);
app.use('/riesgo', riesgoRoutes);

// por ahora, sólo un Healthy!
app.get('/', (req, res) => {
    //res.send('¡Nodempd: Healthy!');
    return res.status(200).json({ message: 'Nodempd: Healthy' });
});


// Ruta POST para manejar el login
app.post('/login', (req, res) => {
  logger.info("POST /login");
    const { username, password } = req.body;
    //console.error('Node: Entramos a /login:', username, password);
    if (!username || !password) {
        return res.status(400).json({ message: 'Node: Username and password are required.' });
    }
    //console.log('Node: Función login:', login);
    login(username, password)
        .then(token => {
            res.status(200).json({ 
              access_token: token.access_token, 
              token_type: token.token_type, 
              expires_in: token.expires_in,
              refresh_token: token.refresh_token });
        })
        .catch(error => {
            console.error('Node: Login error:', error);
            logger.error(`POST /login error: ${error.message}`);
            if (error.response && (error.response.status === 400 || error.response.status === 401)) {
                res.status(error.response.status).json({ message: 'Node: Authentication failed. Check credentials.' });
            } else {
                res.status(500).json({ message: 'Node: Internal server error.' });
            }
        });
});

// Ruta POST para manejar el refresh_token
app.post('/refreshtoken', (req, res) => {
  const { refresh_token } = req.body;
  //console.error('Node: Entramos a /refresh_token:', username, password);
  if ( !refresh_token) {
      return res.status(400).json({ message: 'Node: refresh_token are required.' });
  }
  //console.log('Node: Función refresh_token:', refresh_token);
  refreshtoken( refresh_token)
      .then(token => {
          res.status(200).json({ 
            access_token: token.access_token, 
            token_type: token.token_type, 
            expires_in: token.expires_in,
            refresh_token: token.refresh_token });
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

// Manjeo de token con cookie

app.post('/logincookie', (req, res) => {
  logger.info("POST /logincookie");

  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: 'Node: Username and password are required.' });
  }

  login(username, password)
      .then(token => {
          // Configura la cookie para el refresh token
          res.cookie('refresh_token', token.refresh_token, {
              httpOnly: true,
              sameSite: "Lax", // O "None" si usas HTTPS
              secure: false,    // Solo en local
              path: "/",
            });
            console.log("Enviando Set-Cookie:", res.getHeaders()["set-cookie"]);

          // Devuelve el access token en el cuerpo de la respuesta
          res.status(200).json({
              access_token: token.access_token,
              token_type: token.token_type,
              expires_in: token.expires_in,
          });
      })
      .catch(error => {
          console.error('Node: Login error:', error);
          logger.error(`POST /login error: ${error.message}`);
          if (error.response && (error.response.status === 400 || error.response.status === 401)) {
              res.status(error.response.status).json({ message: 'Node: Authentication failed. Check credentials.' });
          } else {
              res.status(500).json({ message: 'Node: Internal server error.' });
          }
      });
});

app.post('/refreshtokencookie', (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
  }

  //console.log('Node: /refreshtokencookie refreshToken:' + refreshToken);
  refreshTokenCookie(refreshToken)
      .then(newToken => {
        res.cookie('refresh_token', newToken.refresh_token, {
          httpOnly: true,
          sameSite: "Lax",
          secure: false, // Asegurar en producción
          path: "/"
        });
        //console.log('Node: /refreshtokencookie newToken.refresh_token:' + newToken.refresh_token);
          // Devuelve el nuevo access token en el cuerpo de la respuesta
          res.status(200).json({
              access_token: newToken.access_token,
              token_type: newToken.token_type,
              expires_in: newToken.expires_in,
          });
      })
      .catch(error => {
          console.error('Node: Refresh token error:', error);
          res.status(401).json({ message: 'Invalid refresh token' });
      });
});


// por ahora, sólo un Healthy!
app.get('/iniciarCargas', (req, res) => {
  iniciarCargas();
  return res.status(200).json({ message: 'Nodempd: iniciarCargas' });
});

// Conexión a la base de datos

// Ejemplo de logging
logger.info('INICIO APP');

/*
sequelize.sync()
  .then(() => {
    console.log('Database connected');
    logger.info('Database connected');
    app.listen(3000, () => 
      {
        console.log('Server is running on port 3000');
        logger.info('Server is running on port 3000');
      });
  })
  .catch(error => {
    console.error(error.message || error);
    console.error('Error: La Database no está disponible');
    logger.error('Error: La Database no está disponible');
    process.exit(1); // Cierra el proceso si la base de datos no está disponible
  });
*/

app.listen(3000, () => console.log('Server is running on port 3000'));

module.exports = app; // Para pruebas y flexibilidad adicional

