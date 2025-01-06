// Para creación, sin id
interface SocioISinId2 {
    nombres: any ;
    apePaterno: any;
    apeMaterno: any;
    correo: any;
    celular: any;
    fecNacimiento: any;
    tipoSocio: any;
  }
  
  // Para actualización, incluye id
  interface SocioI2 extends SocioISinId2 {
    id: number;
  }
  
  export { SocioISinId2, SocioI2 };