import { Component, OnInit } from '@angular/core';
import { AppConfiguration } from 'src/config/app-config';
import { DoctorsService } from '../../services/doctors.service';
import { SpecialityService } from '../../services/speciality.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  constructor(private specialityService:SpecialityService,
    private doctorsService:DoctorsService,
    public appconfig:AppConfiguration) { }

  ngOnInit(): void {

    this.getDepartmentList()
    this.getDoctorsList()
  }

  deptList:any=[]
  getDepartmentList(){
    this.specialityService.getSpecialityList().subscribe({
      next:res=>this.deptList=res,
      error:err=>console.log(err)
    })
  }
  

    
  errorHandler(event:any) {
    // (event.target as HTMLImageElement).style.display = 'none';
    console.debug(event);
    event.target.src = "https://www.hamrodoctor.com/image.php?src=/uploads/hospitals/5e53652a04e48.png&w=60&h=60  "
 }

  doctors:any=[]
  speciality_search:any=[]
  getDoctorsList() {
    this.doctorsService.getDoctorList().subscribe(
      {
        next: res => this.doctors = this.filtered=res,
        error: res => this.Error(res),
        // complete: () => this.filterData()
      }

    )
  }
  filtered:any=[]
  filterData(spid:any) {
      // this.filtered=
    this.filtered =this.doctors.filter((epic: { sp_id: number; }) => epic.sp_id === parseInt(spid));
      
    // this.doctors=  this.doctors
  }
  Error(res: any) {
  }




}
