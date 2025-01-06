import { Component } from '@angular/core';
import { Ley } from '../../models/ley';
import { LeyService } from '../../services/ley.service'
import { Tablacdu } from '../../models/tablacdu';
import { TablacduService } from '../../services/tablacdu.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-ley',
  templateUrl: './ley.component.html',
  styleUrl: './ley.component.css'
})
export class LeyComponent {

  leyArray:Ley[] = [];
  arreglo:Ley[] = [];
  getCDUsByTDUArray:Tablacdu[] = [];

  //fecha: string = '31-12-2024';
  //fecha: string = "01-01-2000";

  //id: number, nombre: string, descripcion: string, fechapublicacion: Date, pais: number
  //selectedLey: Ley = new Ley(0, "", "", new Date(), 0);
  selectedLey: Ley = new Ley(0, "", "", "", 0);
  
  filaEditando= {
    id: 0,
    nombre: "",
    descripcion: "",
    fechapublicacion: "",
    pais: 0
  }

  constructor(private leyService:LeyService, private tablacduService: TablacduService, private router: Router) { }

  ngOnInit(): void {
    this.leyService.leyLista().subscribe(data =>{
      for (let i = 0; i < data.length; i++) {
        if (data[i].fechapublicacion != null){
          data[i].fechapublicacion = this.formatISODateToDDMMYYYY(data[i].fechapublicacion);
        } else {
          data[i].fechapublicacion = "";
        }
      }
      this.leyArray = data;
    });

    this.tablacduService.getCDUsByTDU(4).subscribe(data =>{
      this.getCDUsByTDUArray = data;
    });

  }

  datosValidos(validando: Ley ){

    if ( validando.nombre === "" ) {
      return "Ingresar nombre de la Ley"
    }

    if ( validando.descripcion === "" ) {
      return "Ingresar una descripción de la Ley"
    }

    if ( !this.esFechaValida(validando.fechapublicacion)) {
      return "Ingresar una fecha válida"
    }

    let mensaje = ""
    this.tablacduService.tablaCduByIdTdu(validando.pais, 4).subscribe({
      next: (data) => {
        let dataResponse: any = data;
        console.log("next: Pais es valido: dataResponse.status = " + dataResponse.status) 
      },
      error: (err) => {
        
        mensaje = "Error: El Pais es invalido";
        console.log(mensaje);
      }
    });
    
    return mensaje

  }

  addOrEdit(){
    // Si estamos creando un registro:
    if (this.selectedLey.id === 0 ) {
      let mensajeValidacion = this.datosValidos(this.selectedLey);
      console.log("mensajeValidacion: " + mensajeValidacion)
      if ( mensajeValidacion != ""){
        alert(mensajeValidacion);
      } else {
        // Cambia el formato de la fecha de DDMMAAAA a AAAAMMDD para enviarlo a la BD
        this.selectedLey.fechapublicacion = this.formatDateToYYYYMMDD(this.selectedLey.fechapublicacion)
        this.leyService.postLey(this.selectedLey).subscribe({
          next: (data) => {
            let dataResponse: any = data;
            let arreglo = {
              id: dataResponse.id,
              nombre: dataResponse.nombre,
              descripcion: dataResponse.descripcion,
              fechapublicacion: this.formatISODateToDDMMYYYY(dataResponse.fechapublicacion),
              pais: dataResponse.pais
            };
            this.leyArray.push(arreglo);
            this.selectedLey = new Ley(0, "", "", "", 0);
          },
          error: (err) => {
            alert('Hubo un problema al crear la nueva fila en la tabla Ley.');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([this.router.url]);
            });
          }
        });
      }
    }  else {
      let mensajeValidacion = this.datosValidos(this.selectedLey);
      if ( mensajeValidacion != ""){
        this.refrescaFila();
        alert(mensajeValidacion);

      } else {
        // Cambia el formato de la fecha de DDMMAAAA a AAAAMMDD para enviarlo a la BD
        this.selectedLey.fechapublicacion = this.formatDateToYYYYMMDD(this.selectedLey.fechapublicacion)
        this.leyService.putLey(this.selectedLey).subscribe({
          next: (data) => {
            let dataResponse: any = data;
            const index = this.leyArray.findIndex(f => f.id === dataResponse.id);
            if (index !== -1) {
              this.leyArray[index].fechapublicacion =  this.formatISODateToDDMMYYYY(dataResponse.fechapublicacion);
            }
          },
          error: (err) => {
            alert('Hubo un problema al actualizar la tabla CDU.');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([this.router.url]);
            });
          }
        })
      }
    }
    
    //this.selectedLey = new Ley(0, "", "", "", 0);
  }

  // Copiamos la fila que se va a editar para el caso en que se necesite retaurar valores inciales por Binding (ver refrescaFila())
  copiaFilaEditando(ley: Ley){

    this.filaEditando.id = ley.id;
    this.filaEditando.nombre = ley.nombre;
    this.filaEditando.descripcion = ley.descripcion;
    this.filaEditando.fechapublicacion = ley.fechapublicacion;
    this.filaEditando.pais = ley.pais;
  }

  // Si los datos que se editan no son válidos, esta rutina refresca los datos iniciales
  // para dejar la fila en pantalla como al inicio (y evitar el Binding)
  refrescaFila(){
    this.selectedLey.nombre = this.filaEditando.nombre;
    this.selectedLey.descripcion = this.filaEditando.descripcion;
    this.selectedLey.fechapublicacion = this.filaEditando.fechapublicacion;
    this.selectedLey.pais = this.filaEditando.pais;
  }

  openForEdit(ley: Ley){

    // Sacamos una copia de los datos que se van a editar
    this.copiaFilaEditando(ley);

    if ( this.selectedLey.id === 0){
      this.selectedLey = ley;
    } 
    else {
      this.selectedLey = new Ley(0, "", "", "", 0);
    }
    
  }

  delete(){
    if (confirm("Are yu sure you want to deleted it?")){
      const selectedLey_id_antes = this.selectedLey.id
      this.leyService.deleteLey(this.selectedLey).subscribe({
        next: (data) => {
          this.leyArray = this.leyArray.filter(item => item.id !== selectedLey_id_antes);
        },
        error: (err) => {
          alert('Hubo un problema al BORRAR la fila en la tabla Ley.');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.router.url]);
          });
        }
      })
      this.selectedLey = new Ley(0, "", "", "", 0);
    }
  }

  formatISODateToDDMMYYYY(isoDate: string): string {
    // Dividimos la fecha en la 'T' para aislar la parte de fecha
    const [datePart] = isoDate.split('T'); // Extrae "2024-12-08"
    const [year, month, day] = datePart.split('-'); // Divide en [2024, 12, 08]
  
    // Retornamos en formato "dd-mm-aaaa"
    return `${day}-${month}-${year}`;
  }

  formatDateToYYYYMMDD(fecha: string): string {
    // Divide la fecha en día, mes y año usando el separador '-'
    const [dia, mes, anio] = fecha.split('-');
  
    // Devuelve la fecha en formato "aaaa-mm-dd"
    return `${anio}-${mes}-${dia}`;
  }

  // Función de validación
  esFechaValida(fecha: string): boolean {
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;
    if (!regex.test(fecha)) return false;

    const [dia, mes, anio] = fecha.split('-').map(Number);
    //const fechaObj = new Date(anio, mes - 1, dia);
    const fechaObj = new Date(anio, mes - 1, dia);
    return fechaObj.getFullYear() === anio &&
           fechaObj.getMonth() === mes - 1 &&
           fechaObj.getDate() === dia;
  }

  // Propiedad calculada para validar
  /*
  get fechaEsValida(): boolean {
    return this.esFechaValida(this.fecha);
  }
  */
}
