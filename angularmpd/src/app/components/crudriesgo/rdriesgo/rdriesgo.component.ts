import { Component } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { Riesgo, RiesgoCampos } from '../../../models/riesgo';
import { RiesgoService } from '../../../services/riesgo.service'
import { Tablacdu } from '../../../models/tablacdu';
import { TablacduService } from '../../../services/tablacdu.service'
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-rdriesgo',
  templateUrl: './rdriesgo.component.html',
  styleUrl: './rdriesgo.component.css'
})
export class RdriesgoComponent {

  //riesgoArray:Riesgo[] = [];
  RiesgoCamposArray:RiesgoCampos[] = [];
  //riesgoArray: (Riesgo & { descripcionPais?: string })[] = [];
  tablacduArray: Tablacdu[] = [];


  constructor(
    private riesgoService:RiesgoService, 
    private router: Router, 
    private utilsService: UtilsService,
    private tablacduService:TablacduService) { }

  ngOnInit(): void {

    //this.tablacduArrayCarga();
    this.refrescarListaRiesgos();
   
  }

  nuevaRiesgo() {

    this.router.navigate(['menulateral/curiesgo', 0 ]);

  }

  editarRiesgo(id: number) {

    //this.router.navigate(['editar', id]);
    this.router.navigate(['menulateral/curiesgo', id ]);

  }

  deleteRiesgo(riesgo_id: number){
    if (confirm("Are yu sure you want to deleted it?")){
      this.riesgoService.deleteRiesgoId(riesgo_id).subscribe({
        next: (data) => {
          // Refrescar la lista en pantalla
            this.refrescarListaRiesgos();
        },
        error: (err) => {
          alert('Hubo un problema al BORRAR la fila en la tabla Riesgo.');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.router.url]);
        })
      }})
    }
  }

  refrescarListaRiesgos(){
    this.riesgoService.getriesgocampos().subscribe(data =>{
      this.RiesgoCamposArray = data;
      for (let i = 0; i < this.RiesgoCamposArray.length; i++) {
        //console.log("this.RiesgoCamposArray[i].nombre: " + this.RiesgoCamposArray[i].nombre);
      }
    })
  }

}
