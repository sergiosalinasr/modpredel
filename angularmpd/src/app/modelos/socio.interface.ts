// Para creación, sin id
interface SocioISinId {
    nombres: string;
    apePaterno: string;
    apeMaterno: string;
    correo: string;
    celular: string;
    fecNacimiento: string;
    tipoSocio: number;
    foto: string;
  }
  
  // Para actualización, incluye id
  interface SocioI extends SocioISinId {
    id: number;
  }
  
  export { SocioISinId, SocioI };