const { createLogger, format, transports } = require('winston');

// Configuración del logger
const logger = createLogger({
  level: 'info', // Nivel mínimo que se registrará
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    // Elimina el transporte Console
    new transports.File({ filename: 'C:\\tmp\\logs\\mpd\\error.log', level: 'error' }),
    new transports.File({ filename: 'C:\\tmp\\logs\\mpd\\combined.log' }),
  ],
});

module.exports = logger;
