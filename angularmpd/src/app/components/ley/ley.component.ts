import { Component } from '@angular/core';
import { Ley } from '../../models/ley';
import { LeyService } from '../../services/ley.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-ley',
  templateUrl: './ley.component.html',
  styleUrl: './ley.component.css'
})
export class LeyComponent {

  leyArray:Ley[] = [];
  arreglo:Ley[] = [];

  //id: number, nombre: string, descripcion: string, fechapublicacion: Date, pais: number
  selectedLey: Ley = new Ley(0, "", "", new Date(), 0);
  
  filaEditando= {
    id: 0,
    nombre: "",
    descripcion: "",
    fechapublicacion: new Date(),
    pais: 0
  }

  constructor(private leyService:LeyService, private router: Router) { }

  ngOnInit(): void {
    this.leyService.leyLista().subscribe(data =>{
      this.leyArray = data;
    })
  }

  datosValidos(validando: Ley ){
    if (  validando.nombre === "" || validando.descripcion === "" || validando.pais === 0 ){
      return false
    }
    return true
  }

  addOrEdit(){
    // Si estamos creando un registro:
    if (this.selectedLey.id === 0 ) {
      if ( !this.datosValidos(this.selectedLey)){
        alert('Debe ingrasar datos válidos al agregar');
      } else {
        this.leyService.postLey(this.selectedLey).subscribe({
          next: (data) => {
            let dataResponse: any = data;
            let arreglo = {
              id: dataResponse.id,
              nombre: dataResponse.nombre,
              descripcion: dataResponse.descripcion,
              fechapublicacion: dataResponse.fechapublicacion,
              pais: dataResponse.pais
            };
            this.leyArray.push(arreglo);
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
      if ( !this.datosValidos(this.selectedLey)){
        this.refrescaFila();
        alert('Debe ingrasar datos válidos al actualizar');

      } else {
        this.leyService.putLey(this.selectedLey).subscribe({
          next: (data) => {
            let dataResponse: any = data;

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
    
    this.selectedLey = new Ley(0, "", "", new Date(), 0);
  }

  copiaFilaEditando(ley: Ley){

    this.filaEditando.id = ley.id;
    this.filaEditando.nombre = ley.nombre;
    this.filaEditando.descripcion = ley.descripcion;
    this.filaEditando.fechapublicacion = ley.fechapublicacion;
    this.filaEditando.pais = ley.pais;
  }

  refrescaFila(){
    this.selectedLey.nombre = this.filaEditando.nombre;
    this.selectedLey.descripcion = this.filaEditando.descripcion;
    this.selectedLey.fechapublicacion = this.filaEditando.fechapublicacion;
    this.selectedLey.pais = this.filaEditando.pais;
  }

  openForEdit(ley: Ley){

    this.copiaFilaEditando(ley);

    if ( this.selectedLey.id === 0){
      this.selectedLey = ley;
    } 
    else {
      this.selectedLey = new Ley(0, "", "", new Date(), 0);
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
      this.selectedLey = new Ley(0, "", "", new Date(), 0);
    }
  }

}
