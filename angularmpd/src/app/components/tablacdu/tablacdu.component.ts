import { Component } from '@angular/core';
import { Tablacdu } from '../../models/tablacdu';
import { TablacduService } from '../../services/tablacdu.service'

@Component({
  selector: 'app-tablacdu',
  templateUrl: './tablacdu.component.html',
  styleUrl: './tablacdu.component.css'
})
export class TablacduComponent {

  tablacduArray:Tablacdu[] = [];
  arreglo:Tablacdu[] = [];

  selectedTablacdu: Tablacdu = new Tablacdu(0, 0, "", "");

  constructor(private tablacduService:TablacduService) { }

  ngOnInit(): void {
    this.tablacduService.tablaCduLista().subscribe(data =>{
      this.tablacduArray = data;
    })
  }

  addOrEdit(){

    if (this.selectedTablacdu.id === 0){
      //confirm("addOrEdit: this.selectedTablacdu.id == 0 CREATE")
      this.tablacduService.postTablacdu(this.selectedTablacdu).subscribe( data =>{
        let dataResponse:any=data;
        let arreglo={id: dataResponse.id, id_tdu: dataResponse.id_tdu, nombreCorto: dataResponse.nombreCorto, descripcionLarga: dataResponse.descripcionLarga}
        this.tablacduArray.push(arreglo)
        
      })
    }  else {
      //confirm("addOrEdit: this.selectedTablacdu.id==" + this.selectedTablacdu.id + "UPDATE")
      this.tablacduService.putTablacdu(this.selectedTablacdu).subscribe({
        next: (data) => {
          let dataResponse: any = data;
          console.log('Respuesta exitosa:', dataResponse);
        },
        error: (err) => {
          console.error('Error al actualizar:', err)
          this.tablacduArray = [...this.tablacduArray];
          alert('Hubo un problema al actualizar la tabla CDU.');
        },
        complete: () => {
          console.log('Operación completada.');
        }
      })
    }
    
    this.selectedTablacdu = new Tablacdu(0, 0, "", "");
  }

  openForEdit(tablacdu: Tablacdu){

    if ( this.selectedTablacdu.id === 0){
      this.selectedTablacdu = tablacdu;
    } 
    else {
      this.selectedTablacdu = new Tablacdu(0, 0, "", "");
    }
    
  }

  delete(){
    if (confirm("Are yu sure you want to deleted it?")){
      this.tablacduService.deleteTablacdu(this.selectedTablacdu).subscribe( data =>{
        let dataResponse:any=data;
        if (dataResponse.id == this.selectedTablacdu.id){

          this.tablacduArray = this.tablacduArray.filter(item => item.id !== this.selectedTablacdu.id);

        }else{

        }
      })
      this.tablacduArray = this.tablacduArray.filter(item => item.id !== this.selectedTablacdu.id);
      this.selectedTablacdu = new Tablacdu(0, 0, "", "");
    }
    
  }


}
