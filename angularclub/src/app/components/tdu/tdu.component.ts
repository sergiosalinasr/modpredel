// tdu-maintenance.component.ts
import { Component, OnInit } from '@angular/core';
import { TduService } from '../../services/tdu.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tdu-maintenance',
  templateUrl: './tdu.component.html',
  styleUrls: ['./tdu.component.css']
})
export class TduMaintenanceComponent implements OnInit {
  tduForm: FormGroup;
  tduList: any[] = [];

  constructor(private tduService: TduService, private fb: FormBuilder) {
    this.tduForm = this.fb.group({
      nombreCorto: [''],
      descripcionLarga: ['']
    });
  }

  ngOnInit(): void {
    this.loadTdus();
  }

  loadTdus(): void {
    this.tduService.getTdus().subscribe((data) => {
      this.tduList = data;
    });
  }

  onSubmit(): void {
    const tdu = this.tduForm.value;
    if (tdu.id) {
      this.tduService.updateTdu(tdu.id, tdu).subscribe(() => this.loadTdus());
    } else {
      this.tduService.createTdu(tdu).subscribe(() => this.loadTdus());
    }
    this.tduForm.reset();
  }

  editTdu(tdu: any): void {
    this.tduForm.patchValue(tdu);
  }

  deleteTdu(id: number): void {
    this.tduService.deleteTdu(id).subscribe(() => this.loadTdus());
  }
}

