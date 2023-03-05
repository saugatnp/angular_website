import { formatDate } from "@angular/common";

export class AppointmentModel {
    pname: string = ''
    age: number = 0;
    address: string = ''
    sex: string = ''
    email: string = ''
    mobile: number = 0
    speciality: number = 0
    referer: number = 0
    date: string = formatDate(new Date(),'yyyy-MM-dd','EN-US')
    time: string = ''
    remarks: string = ''

}