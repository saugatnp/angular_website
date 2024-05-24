import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { ModalConfig } from './modal.config'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { AppointmentModel } from '../models/appointment.model'
import { HttpClient } from '@angular/common/http'
import { AppConfiguration } from 'src/config/app-config'

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
})
@Injectable()
export class ModalComponent implements OnInit {
  @Input() public modalConfig!: ModalConfig
  @ViewChild('modal') private modalContent!: TemplateRef<ModalComponent>
  @ViewChild('startModal') private modalContent1!: TemplateRef<ModalComponent>

  private modalRef!: NgbModalRef

  @Input() appointmentData!: AppointmentModel


  baseUrl: String = ''
  constructor(private modalService: NgbModal,
    private http: HttpClient,
    private appConfig: AppConfiguration) {
    this.baseUrl = appConfig.baseUrl

    // this.appointmentData.referer=this.appointmentData.referer
  }

  ngOnInit(): void { }

  @Input() size: string = 'lg'
  @Input() type: string = 'doctor'



  @Input() contentData:any=[];

  @Input() modalLength!:number

  

  open(): Promise<boolean> {
    if (this.type == 'doctor') {
      var modal = this.modalContent
    }
    else {
      var modal = this.modalContent1
    }
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', size: this.size, centered: true })
      this.modalRef.result.then(resolve, resolve)
    })
  }

  async close(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined ) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose())
      this.modalRef.close(result)
    }
  }

  async dismiss(): Promise<void> {
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss())
      this.modalRef.dismiss(result)
    }
  }


  postAppointment() {
    this.http.post(this.baseUrl + 'api/onlineappointment', this.appointmentData)
      .subscribe(
        {
          next: res => this.Success(res),
          error: res => this.Error(res),
        })
  }


  Success(res: any) {

  }
  Error(res: any) {

  }



}