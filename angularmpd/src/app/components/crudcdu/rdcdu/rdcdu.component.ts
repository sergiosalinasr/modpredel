import { Component } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { Cdu, CduCampos } from '../../../models/cdu';
import { CduService } from '../../../services/cdu.service'
import { Tablacdu } from '../../../models/tablacdu';
import { TablacduService } from '../../../services/tablacdu.service'
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-rdcdu',
  templateUrl: './rdcdu.component.html',
  styleUrl: './rdcdu.component.css'
})
export class RdcduComponent {

  //cduArray:Cdu[] = [];
  CduCamposArray:CduCampos[] = [];
  //cduArray: (Cdu & { descripcionPais?: string })[] = [];
  tablacduArray: Tablacdu[] = [];


  constructor(
    private cduService:CduService, 
    private router: Router, 
    private utilsService: UtilsService,
    private tablacduService:TablacduService) { }

  ngOnInit(): void {

    //this.tablacduArrayCarga();
    this.refrescarListaCdus();
   
  }

  nuevaCdu() {

    this.router.navigate(['menulateral/cucdu', 0 ]);

  }

  editarCdu(id: number) {

    //this.router.navigate(['editar', id]);
    this.router.navigate(['menulateral/cucdu', id ]);

  }

  deleteCdu(cdu_id: number){
    if (confirm("Are yu sure you want to deleted it?")){
      this.cduService.deleteCduId(cdu_id).subscribe({
        next: (data) => {
          // Refrescar la lista en pantalla
            this.refrescarListaCdus();
        },
        error: (err) => {
          alert('Hubo un problema al BORRAR la fila en la tabla Cdu.');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.router.url]);
        })
      }})
    }
  }

  refrescarListaCdus(){
    this.cduService.getcducampos().subscribe(data =>{
      this.CduCamposArray = data;
      for (let i = 0; i < this.CduCamposArray.length; i++) {
        //console.log("this.CduCamposArray[i].nombre: " + this.CduCamposArray[i].nombre);
      }
    })
  }

}
