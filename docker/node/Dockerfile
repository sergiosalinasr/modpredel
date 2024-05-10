# Usa la imagen base oficial de Node.js
FROM node:16

# Define el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de definición de paquetes al directorio de trabajo
COPY nodeclub/package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY nodeclub/ ./

# Expone el puerto que tu aplicación utiliza
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "src/index.js"]

# desde clubr1
# docker build -f docker/node/Dockerfile -t nodeclub .
# docker run -p 3000:3000 nodeclub