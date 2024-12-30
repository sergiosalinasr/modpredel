import { Component } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { Delito, DelitoCampos } from '../../../models/delito';
import { DelitoService } from '../../../services/delito.service'
import { Tablacdu } from '../../../models/tablacdu';
import { TablacduService } from '../../../services/tablacdu.service'
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-rddelito',
  templateUrl: './rddelito.component.html',
  styleUrl: './rddelito.component.css'
})
export class RddelitoComponent {

  //delitoArray:Delito[] = [];
  DelitoCamposArray:DelitoCampos[] = [];
  //delitoArray: (Delito & { descripcionPais?: string })[] = [];
  tablacduArray: Tablacdu[] = [];


  constructor(
    private delitoService:DelitoService, 
    private router: Router, 
    private utilsService: UtilsService,
    private tablacduService:TablacduService) { }

  ngOnInit(): void {

    //this.tablacduArrayCarga();
    this.refrescarListaDelitos();
   
  }

  nuevaDelito() {

    this.router.navigate(['menulateral/cudelito', 0 ]);

  }

  editarDelito(id: number) {

    //this.router.navigate(['editar', id]);
    this.router.navigate(['menulateral/cudelito', id ]);

  }

  deleteDelito(delito_id: number){
    if (confirm("Are yu sure you want to deleted it?")){
      this.delitoService.deleteDelitoId(delito_id).subscribe({
        next: (data) => {
          // Refrescar la lista en pantalla
            this.refrescarListaDelitos();
        },
        error: (err) => {
          alert('Hubo un problema al BORRAR la fila en la tabla Delito.');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.router.url]);
        })
      }})
    }
  }

  refrescarListaDelitos(){
    this.delitoService.getdelitocampos().subscribe(data =>{
      this.DelitoCamposArray = data;
      for (let i = 0; i < this.DelitoCamposArray.length; i++) {
        console.log("this.DelitoCamposArray[i].nombre: " + this.DelitoCamposArray[i].nombre);
      }
    })
  }

}
