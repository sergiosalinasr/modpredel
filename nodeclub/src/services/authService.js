const axios = require('axios');
const qs = require('querystring');

const tokenEndpoint = 'http://localhost:8081/auth/realms/master/protocol/openid-connect/token'; // Ajusta esto según tu configuración de Keycloak

function login(username, password) {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const body = qs.stringify({
    client_id: 'admin-cli',
    // client_secret: 'tu_client_secret', // Descomenta si es necesario para tu configuración de Keycloak
    username: username,
    password: password,
    grant_type: 'password'
  });

  return axios.post(tokenEndpoint, body, { headers })
    .then(response => response.data)
    .catch(error => {
      if (!error.response || error.response.status === 0 || error.response.status === 504) {
        console.error('El servicio de autenticación no está disponible.');
        throw new Error('Authentication service unavailable');
      }
      throw error;
    });
}

module.exports = { login };
