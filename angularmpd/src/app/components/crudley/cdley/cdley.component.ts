import { Component } from '@angular/core';
import { Ley, LeyCampos } from '../../../models/ley';
import { LeyService } from '../../../services/ley.service'
import { Tablacdu } from '../../../models/tablacdu';
import { TablacduService } from '../../../services/tablacdu.service'
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cdley',
  templateUrl: './cdley.component.html',
  styleUrl: './cdley.component.css'
})
export class CdleyComponent {

  //leyArray:Ley[] = [];
  LeyCamposArray:LeyCampos[] = [];
  //leyArray: (Ley & { descripcionPais?: string })[] = [];
  tablacduArray: Tablacdu[] = [];


  constructor(private leyService:LeyService, private router: Router, private tablacduService:TablacduService) { }

  ngOnInit(): void {

    //this.tablacduArrayCarga();
    this.refrescarListaLeyes();
   
  }

  nuevaLey() {

    this.router.navigate(['menulateral/culey', 0 ]);

  }

  editarLey(id: number) {

    //this.router.navigate(['editar', id]);
    this.router.navigate(['menulateral/culey', id ]);

  }

  deleteLey(ley_id: number){
    if (confirm("Are yu sure you want to deleted it?")){
      this.leyService.deleteLeyId(ley_id).subscribe({
        next: (data) => {
          // Refrescar la lista en pantalla
            this.refrescarListaLeyes();
        },
        error: (err) => {
          alert('Hubo un problema al BORRAR la fila en la tabla Ley.');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.router.url]);
        })
      }})
    }
  }

  formatISODateToDDMMYYYY(isoDate: string): string {
    // Dividimos la fecha en la 'T' para aislar la parte de fecha
    const [datePart] = isoDate.split('T'); // Extrae "2024-12-08"
    const [year, month, day] = datePart.split('-'); // Divide en [2024, 12, 08]
  
    // Retornamos en formato "dd-mm-aaaa"
    return `${day}-${month}-${year}`;
  }

  refrescarListaLeyes(){
    this.leyService.getleycampos().subscribe(data =>{
      this.LeyCamposArray = data;
      for (let i = 0; i < this.LeyCamposArray.length; i++) {
        console.log("this.LeyCamposArray[i].descripcionpais: " + this.LeyCamposArray[i].descripcionpais);
        if (this.LeyCamposArray[i].fechapublicacion != null){
          this.LeyCamposArray[i].fechapublicacion = this.formatISODateToDDMMYYYY(this.LeyCamposArray[i].fechapublicacion);
        } else {
          this.LeyCamposArray[i].fechapublicacion = "";
        }
      }
    })
    for (let i = 0; i < this.LeyCamposArray.length; i++) {
      //this.leyArray[i].descripcionPais = this.nombrePais(this.leyArray[i].pais);
    }
  }

  /*
  tablacduArrayCarga(){
    this.tablacduService.getCDUsByTDU(4).subscribe({
      next: (data) => {
        this.tablacduArray = data;
      },
      error: (err) => {
      }
    });
  }
  */

  async tablacduArrayCarga() {
    try {
      this.tablacduArray = await firstValueFrom(this.tablacduService.getCDUsByTDU(4));
      this.refrescarListaLeyes();
    } catch (err) {
      console.error('Error al cargar el array de CDU:', err);
      // Manejo del error (puedes mostrar un mensaje al usuario o realizar otra acción)
    }
  }

  nombrePais(idPais: number): string {
    console.log("Buscando el pais: " + idPais);
  
    const pais = this.tablacduArray.find(item => item.id === idPais);
  
    if (pais) {
      return pais.nombreCorto;
    }
  
    return "País no encontrado";
  }
  

}
