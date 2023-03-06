import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { ModalConfig } from './modal.config'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { AppointmentModel } from '../models/appointment.model'
import { HttpClient } from '@angular/common/http'
import { AppConfiguration } from 'src/config/app-config'

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
@Injectable()
export class ModalComponent implements OnInit {
  @Input() public modalConfig!: ModalConfig
  @ViewChild('modal') private modalContent!: TemplateRef<ModalComponent>
  private modalRef!: NgbModalRef

  @Input() appointmentData!:AppointmentModel

  // @Input() public modalConfig: ModalConfig
  // @ViewChild('modal') private modalContent: TemplateRef<ModalComponent>
  // private modalRef: NgbModalRef
  baseUrl:String=''
  constructor(private modalService: NgbModal,
    private http:HttpClient,
    private appConfig:AppConfiguration) {
      this.baseUrl=appConfig.baseUrl

      // this.appointmentData.referer=this.appointmentData.referer
     }

  ngOnInit(): void { }

  @Input() size:string='lg'

  open(): Promise<boolean> {
    console.log(this.appointmentData)
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent, { ariaLabelledBy: 'modal-basic-title', size: this.size, centered: true })
      this.modalRef.result.then(resolve, resolve)
    })
  }

  async close(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
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


  postAppointment(){
    this.http.post(this.baseUrl + 'api/onlineappointment', this.appointmentData)
    .subscribe(
      {
        next: res => this.Success(res),
        error: res => this.Error(res),
      })
    }
  

  Success(res:any){

  }
  Error(res:any){

  }


  
}