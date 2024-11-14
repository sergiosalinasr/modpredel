# Club: esta aplicación permite iniciar el desarrollo de un sistema a partir contando con algunas características básicas disponibles desde el inicio:
- Características:
  - Servidor docker Keycloak para resguardo de credenciales
  - Backend en node con servidor en docker con las APIs necesarias para crendenciales de un nuevo usuario
  - Frontend en Angular con bienvenida de solicitud de credenciales y un menú inicial
- Contar con los docker compose para levantar distintos ambientes de desarrollo:
  - Docker de Keycloak para desarrollar en frontend y backend
  - Docker de Keycloak + backend en node para desarrollo frontend
  - Docker con Keycloak, backend node y frontend Angular para probar la aplicación

## instalación:
- Una vez obtenido este repositorio desde Github y descomprimirlo
- Levantar Docker Desktop (v4.10.1 (82475))
- Contar con node instalado (v20.10.0)
- Ingresar a linea de comando Windows (o un terminal)
- Posicionado en carpeta "master-club"
- Levantar docker de Keycloak: 
  - docker compose -f docker/docker-composeKC.yaml -p kc_project up -d
  - localhost:8081 (esperar 2-3 min. admin/admin)
- Levantar el servicio de node en modo desarrollo:
  - Ingresar a linea de comando Windows (o un terminal)
  - Posicionado en carpeta "master-club"
    - cd nodeclub
    - npm install
    - node src/index.js 
    - Desde el browser:
      - localhost:3000
      - Respuesta: {"message":"¡Node: Healthy!"}
- Levantar el servicio de frontend Angular:
  - Ingresar a linea de comando Windows (o un terminal)
  - Posicionado en carpeta "master-club"
    - cd angularclub
    - npm install
    - ng serve
    - Desde el browser:
    - localhost:4200
    - Ingresar usuario/password y presionar "Nuevo Usuario" y luego "LOGIN"
    - Conduce al menú: "Menu", "Aquí", "Tu", "Aplicacion" 


