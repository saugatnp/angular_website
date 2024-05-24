import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import * as moment from 'moment';
import { JsonAppConfigService } from 'src/config/json-app-config.service';
import { ModalComponent } from '../../modal/modal.component';
import { ModalConfig } from '../../modal/modal.config';
import { AppointmentModel } from '../../models/appointment.model';
import { Settings, SettingsGroup } from '../../pages/admin/settings/settings.model';
import { PageContentService } from '../../services/pagecontent.service';
import { BroadcastService } from '../../services/broadcast.service';


@Component({
  selector: 'doctor-card',
  templateUrl: './doctorcard.component.html',
  styleUrls: ['./doctorcard.component.css']


})
export class DoctorCardComponent implements OnInit {

  show: boolean = true;
  baseUrl = ''
  logoUrl : any;
  constructor(private router: Router,
    private http: HttpClient,
    private pagecontent: PageContentService,
    public appconfig: JsonAppConfigService,
    private broadcastService : BroadcastService
  ) {
    this.broadcastService.currentLogo.subscribe({
      next: data => {
        this.logoUrl = data
      }
    })
    this.baseUrl = this.appconfig.baseUrl;
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationStart) {

        if (event.url.includes('Admin')) {
          this.show = false

        }
        else
          this.show = true
      }
    });
    // this.getPageContent()
    // this.getSettings()
    // this.year = formatDate(new Date(), 'yyyy', 'EN-US')

  }


  @ViewChild(ModalComponent) modal!:  ModalComponent;



  @Input() x: any = []

  @Input() inputcss: string = ''
  selectedDoctor: any = []
  selectDoctor(x: any) {
    this.selectedDoctor = x;
// this.openModal()
    this.getPageContent()
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
  Error(err: any) {

  }


  appointmentData = new AppointmentModel();
  reset() {
    this.appointmentData = new AppointmentModel();
  }

  modalConfig !: ModalConfig




  @ViewChild('modal') private modalComponent!: ModalComponent

  async openModal() {
    this.modalConfig = { modalTitle: 'Book  ' + this.selectedDoctor.referer, closeButtonLabel: 'End' }
    return await this.modalComponent.open()
  }



  errorHandler(event: any) {
    console.debug(event);
    event.target.src = this.logoUrl
  }




  year: any = ''
  contents: any = []
  getPageContent() {
    this.pagecontent.getPageContent().subscribe({
      next: res => this.storeContent(res),
      error: err => console.log(err)

    })
  }
  storeContent(res: any) {
    this.contents = res.filter((x: { page_title: string, published: boolean }) => (x.page_title == this.selectedDoctor.referer) && x.published == true);
    if(this.contents.length==0){
      return;
    }
    else{
      this.gotoPage(this.selectedDoctor);
    }
  }

  
  getSettings() {
    const token = localStorage.getItem('access_token');
    const options = {
      'headers': { 'Authorization': 'Bearer' + token }
    }
    var postUrl = 'api/GetSettingsDetailByName';
    this.http.get(this.baseUrl + postUrl, options)
      .subscribe(
        {
          next: res => this.successGet(res),
          error: res => this.errorToastr(),

        })
  }
  data = new SettingsGroup()
  successGet(res: any) {
    res.map((x: { name: string; value: any; published: boolean; }) => {
      Object.keys(this.data).map(y => {
        if (y == x.name && x.published == true) {
          this.data[y as keyof SettingsGroup] = x.value

        }
      })
    })
    console.log(this.data);
  }
  errorToastr() {
    // this.toastr.error('Error', 'Error')
  }

 
  getColumns(): any[] {
    const numCols = Math.ceil(this.contents.length / 3); // calculate the number of columns needed
    const columns = [];

    for (let i = 0; i < numCols; i++) {
      const start = i * 3;
      const end = start + 3;
      const column = this.contents.slice(start, end);
      columns.push(column);
    }

    return columns;
  }

  gotoPage(x: any) {

    this.router.navigate(['/Page/' + x.refid + '/' + x.referer +'/referer']);

    // location.reload();
  }


}
