import { Component } from '@angular/core';
import { Tablatdu } from '../../models/tablatdu';
import { TablatduService } from '../../services/tablatdu.service'

@Component({
  selector: 'app-tablatdu',
  templateUrl: './tablatdu.component.html',
  styleUrl: './tablatdu.component.css'
})
export class TablatduComponent {

  tablatduArray:Tablatdu[] = [];

  selectedTablatdu: Tablatdu = new Tablatdu(0, "", "");

  constructor(private tablatduService:TablatduService) { }

  ngOnInit(): void {
    this.tablatduService.tablaTduLista().subscribe(data =>{
      this.tablatduArray = data;
    })
  }

  addOrEdit(){

    // Si no hay emppleado seleccionado...
    if (this.selectedTablatdu.id == 0){
      
    }
    
    this.selectedTablatdu = new Tablatdu(0, "", "");
  }

  openForEdit(tablatdu: Tablatdu){
    if ( this.selectedTablatdu.id == 0){
      this.selectedTablatdu = tablatdu;
    } else {
      this.selectedTablatdu = new Tablatdu(0, "", "");
    }
    
  }

}
