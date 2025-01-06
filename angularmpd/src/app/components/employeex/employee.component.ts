import { Component } from '@angular/core';

import { Employee} from "../../models/employee"
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  employeeArray: Employee[] = [
    {id: 1, name: "Ryan", country: "USA"},
    {id: 2, name: "Angelica", country: "USA"},
    {id: 3, name: "Joe", country: "USA"},
    {id: 4, name: "Joe2", country: "USA"},
    {id: 5, name: "Joe3", country: "USA"},
    {id: 6, name: "Joe4", country: "USA"}
  ];

  selectedEmployee: Employee = new Employee(0, "", "");

  addOrEdit(){

    // Si no hay emppleado seleccionado...
    if (this.selectedEmployee.id == 0){
      this.selectedEmployee.id = this.employeeArray.length + 1;
      this.employeeArray.push(this.selectedEmployee);
    }
    
    this.selectedEmployee = new Employee(0, "", "");
  }

  agregar(){

    // Si no hay emppleado seleccionado...
    if (this.selectedEmployee.name == "") {
      alert("Al menos el nombre debe tener contenido");
    } 
    else {
      this.selectedEmployee.id = this.employeeArray.length + 1;
      this.employeeArray.push(this.selectedEmployee);
    }
    
    this.selectedEmployee = new Employee(0, "", "");
  }

  openForEdit(employee: Employee){
    if ( this.selectedEmployee.id == 0){
      this.selectedEmployee = employee;
    } else {
      this.selectedEmployee = new Employee(0, "", "");
    }
    
  }

  delete(){
    if (confirm("Are yu sure you want to deleted it?")){
      this.employeeArray = this.employeeArray.filter( x => x != this.selectedEmployee);
      this.selectedEmployee = new Employee(0, "", "");
    }
    
  }

}
