import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { AppConfiguration } from 'src/config/app-config';
import { ModalComponent } from '../../modal/modal.component';
import { ModalConfig } from '../../modal/modal.config';
import { AppointmentModel } from '../../models/appointment.model';
import { DoctorsService } from '../../services/doctors.service';
import { SpecialityService } from '../../services/speciality.service';
import { BroadcastService } from '../../services/broadcast.service';


@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  logoUrl : any


  constructor(private specialityService: SpecialityService,
    private doctorsService: DoctorsService,

    private http: HttpClient,
    public appconfig: AppConfiguration,
    private broadcastService : BroadcastService
  ) {
    this.broadcastService.currentLogo.subscribe({
      next: data => {
        this.logoUrl = data
      }
    })
    this.baseUrl = appconfig.baseUrl;
  }

  baseUrl: string = ''
  ngOnInit(): void {



    this.getDepartmentList()
    this.getDoctorsList()
  }

  appointmentData: AppointmentModel = new AppointmentModel();
  deptList: any = []
  getDepartmentList() {
    this.specialityService.getSpecialityList().subscribe({
      next: res => this.deptList = res,
      error: err => console.log(err)
    })
  }




  errorHandler(event: any) {
    // (event.target as HTMLImageElement).style.display = 'none';
    console.debug(event);
    event.target.src = this.logoUrl
  }





  doctors: any = []
  speciality_search: any = []
  getDoctorsList() {
    this.doctorsService.getDoctorList().subscribe(
      {
        next: res => this.doctors = this.filtered = res,
        error: res => this.Error(res),
        // complete: () => this.filterData()
      }

    )
  }
  filtered: any = []


  filterData(spid: any) {
    this.filtered = this.doctors.filter((epic: { sp_id: number; }) => epic.sp_id === parseInt(spid));
    if(this.search!=''){
    this.filtered = this.filtered.filter((epic: { referer: string; }) => epic.referer.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
  }

  }
  Error(res: any) {
  }

  selectedDoctor: any = []
  selectDoctor(doc: any) {
    this.selectedDoctor = doc;
    this.appointmentData.referer = doc.refid;
    this.appointmentData.speciality = doc.sp_id;

  }

  isBefore(date1: any, date2: any) {
    // return date1 > date2;
    // const moment = require('moment');

    // var now = moment().format('LLLL');

  }


  postAppointment() {

    if (
      moment(new Date()).isBefore(this.appointmentData.date)
    ) {
      return;
    } // true

    else {

      const token = localStorage.getItem('access_token');
      const options = {
        'headers': { 'Authorization': 'Bearer ' + token }
      }

      this.http.post(this.baseUrl + 'api/onlineappointment', this.appointmentData, options)
        .subscribe(
          {
            next: res => this.Success(res),
            error: res => this.Error(res),
          })
    }
  }

  Success(res: any) {
    this.reset()
    // this.modal.dismissAll();
  }


  reset() {
    this.appointmentData = new AppointmentModel();
    this.search='';
    this.speciality_search=[];
    this.filtered=this.doctors;
  }

  modalConfig !: ModalConfig


  @ViewChild('modal') private modalComponent!: ModalComponent

  async openModal() {
    return await this.modalComponent.open()
  }

  search: string = ''

  searchData() {
    if(this.search==''){
      this.filtered=this.doctors;
    }
    if(this.speciality_search.detail==''){
    this.filtered = this.doctors.filter((epic: { referer: string; }) => epic.referer.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
    }

    else{
      this.filtered = this.doctors.filter((epic: { sp_id: number; }) => epic.sp_id === parseInt(this.speciality_search.sp_id));


    this.filtered = this.filtered.filter((epic: { referer: string; }) => epic.referer.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));

    if (this.filtered.length == 0) {
      this.filtered = this.doctors.filter((epic: { referer: string; }) => epic.referer.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));

    }
  }
  }

}
