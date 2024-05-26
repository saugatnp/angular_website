import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppConfiguration } from 'src/config/app-config';
import { LabReportDownloadService } from '../../services/labdownload.service';

@Component({
  selector: 'app-labreportdownload',
  templateUrl: './labreportdownload.component.html',
  styleUrls: ['./labreportdownload.component.css']
})
export class LabreportdownloadComponent implements OnInit {

  constructor(private http: HttpClient,
    private appconfig: AppConfiguration,
    private labreport: LabReportDownloadService,

  ) {
    this.downloadUrl = this.appconfig.onlineLabUrl

  }


  ngOnInit(): void {
  }
  data: any = [];
  downloadUrl: string = '';


  labReport: any = []

  getReport() {

    // if(this.data.invno.length!=11){
    //     document.getElementById('invno')?.focus()
    //   return;
    // }
    // if(this.data.phnno.length!=10){
    //   document.getElementById('phnno')?.focus()
    //   return;

    // }

    this.labreport.getReport(this.data.invno, this.data.phoneno).subscribe({
      next: res => this.storeReport(res),
      error: err => this.showError(err)
    })
  }

  showUnavailable: boolean = false


  storeReport(res: any) {
    this.labReport = res;
    if (this.labReport.length != 0) {
      this.labReport = res[0]
      this.showUnavailable = false
    }
    else {
      this.showUnavailable = true;
    }
  }
  showError(err: any) {
    console.error(err);
    this.showUnavailable = true

  }

  downloadReport() {
    var url = this.downloadUrl + this.data.invno + '_' + this.data.phoneno + '.pdf';

    window.open(url,
      '_blank', '');

  }



}
