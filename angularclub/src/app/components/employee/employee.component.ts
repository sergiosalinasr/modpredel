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
    {id: 3, name: "Joe", country: "USA"}
  ];
}
