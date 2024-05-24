import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../../services/doctors.service';

@Component({
  selector: 'app-opdtimes',
  templateUrl: './opdtimes.component.html',
  styleUrls: ['./opdtimes.component.css']
})
export class OpdtimesComponent implements OnInit {

  constructor(private doctorservice: DoctorsService) {

    doctorservice.getDoctorList().subscribe({
      next: x => this.doctorsList = x,
    })

  }

  doctorsList: any = []
  ngOnInit(): void {
  }

}
