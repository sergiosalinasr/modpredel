import { Component } from '@angular/core';
import { format } from 'date-fns';
import { UtilsService } from '../../../services/utils.service';
import { Ley } from '../../../models/ley';
import { LeyService } from '../../../services/ley.service'
import { TablacduService } from '../../../services/tablacdu.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-culey',
  templateUrl: './culey.component.html',
  styleUrl: './culey.component.css'
})
export class CuleyComponent {

  selectedLey: Ley = new Ley(0, "", "", "", 0);
  leyIdEntrada: number = 0;

  constructor(private leyService:LeyService, 
    private router: Router, 
    private activerouter:ActivatedRoute, 
    private utilsService: UtilsService, 
    private tablacduService: TablacduService) { }

  ngOnInit(): void {
    this.leyIdEntrada = Number(this.activerouter.snapshot.paramMap.get('id'));
    
    if ( this.leyIdEntrada > 0){
      this.leyService.leyById(this.leyIdEntrada).subscribe(data =>{
        this.selectedLey = data[0];
        this.selectedLey.fechapublicacion = this.utilsService.formatISODateToDDMMYYYY(this.selectedLey.fechapublicacion)
      })
    }
  }

  guardarLey(){

  }

  addOrEdit(){
    // Si estamos creando un registro:
    if (this.leyIdEntrada === 0 ) {
      let mensajeValidacion = this.datosValidos(this.selectedLey);
      console.log("mensajeValidacion: " + mensajeValidacion)
      if ( mensajeValidacion != ""){
        alert(mensajeValidacion);
      } else {
        // Cambia el formato de la fecha de DDMMAAAA a AAAAMMDD para enviarlo a la BD
        this.selectedLey.fechapublicacion = this.utilsService.formatDateToYYYYMMDD(this.selectedLey.fechapublicacion)
        this.leyService.postLey(this.selectedLey).subscribe({
          next: (data) => {
            let dataResponse: any = data;
            this.selectedLey = new Ley(0, "", "", "", 0);
            this.router.navigate(['menulateral/cdley']);
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
        alert(mensajeValidacion);
      } else {
        // Cambia el formato de la fecha de DDMMAAAA a AAAAMMDD para enviarlo a la BD
        this.selectedLey.fechapublicacion = this.utilsService.formatDateToYYYYMMDD(this.selectedLey.fechapublicacion)
        this.leyService.putLey(this.selectedLey).subscribe({
          next: (data) => {
            let dataResponse: any = data;
            this.router.navigate(['menulateral/cdley']);
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

}
