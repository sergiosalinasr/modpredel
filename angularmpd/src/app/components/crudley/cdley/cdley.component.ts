import { Component } from '@angular/core';
import { Ley } from '../../../models/ley';
import { LeyService } from '../../../services/ley.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-cdley',
  templateUrl: './cdley.component.html',
  styleUrl: './cdley.component.css'
})
export class CdleyComponent {

  leyArray:Ley[] = [];

  constructor(private leyService:LeyService, private router: Router) { }

  ngOnInit(): void {

      this.refrescarListaLeyes();
   
  }

  nuevaLey() {

  }

  editarLey(ley_id: number) {

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
    this.leyService.leyLista().subscribe(data =>{
      for (let i = 0; i < data.length; i++) {
        if (data[i].fechapublicacion != null){
          data[i].fechapublicacion = this.formatISODateToDDMMYYYY(data[i].fechapublicacion);
        } else {
          data[i].fechapublicacion = "";
        }
      }
     this.leyArray = data;
    })
  }

}
