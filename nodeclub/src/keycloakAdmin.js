const axios = require('axios');
const keycloakUrl = 'http://localhost:8080/auth'; // Ajusta esto según tu configuración
const realm = 'YourRealm';
const clientId = 'admin-cli';
const clientSecret = 'your-client-secret'; // Utiliza variables de entorno para gestionar secretos
const tokenEndpoint = '/auth/realms/master/protocol/openid-connect/token'; // Ajusta esto según tu configuración de Keycloak

async function getKeycloakAdminToken() {
  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('username', 'admin');
  params.append('password', 'admin');
  params.append('grant_type', 'password');
    // /auth/realms/master/protocol/openid-connect/token
  const response = await axios.post(`http://localhost:8081/auth/realms/master/protocol/openid-connect/token`, params);
  return response.data.access_token;
}

async function checkUserExists(username) {
  const token = await getKeycloakAdminToken();
  //KEYCLOAK_URL = process.env.KEYCLOAK_URL + tokenEndpoint
  console.error('Node: checkUserExists: ', username);
  const response = await axios.get(`http://localhost:8081/auth/realms/master/users?username=${username}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data.length > 0;
}

async function createUser(username, password) {
  const token = await getKeycloakAdminToken();
  const userData = {
    username,
    enabled: true,
    credentials: [{ type: 'password', value: password, temporary: false }],
    attributes: {},
  };

  const response = await axios.post(`${keycloakUrl}/admin/realms/${realm}/users`, userData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  return { id: response.headers.location }; // Devuelve el ID del usuario creado
}

module.exports = {
  checkUserExists,
  createUser
};
