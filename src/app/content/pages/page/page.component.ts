import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonAppConfigService } from 'src/config/json-app-config.service';
import { PageContentService } from '../../services/pagecontent.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  baseUrl = ''
  content: any = []
  param: any = ''
  constructor(private router: Router,
    private activated: ActivatedRoute,
    private appconfig: JsonAppConfigService,
    private contentService: PageContentService,
    private http: HttpClient
  ) {

    this.baseUrl = appconfig.baseUrl;

    this.param = this.activated.snapshot.paramMap.get('id');

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit(): void {

    this.getContent()
  }
ngOnChanges(){

}

  getContent() {
    this.contentService.getPageContent().subscribe({
      next: res => this.storeContent(res),
      error: err => console.log(err)
    })
  }

  storeContent(res: any) {


    this.content = res.filter((epic: { page_title: string; }) => epic.page_title == this.param)[0];

    console.log(this.content);

    this.getPicture();


    // console.log(this.content)
  }



  getPicture() {
    var token = localStorage.getItem('access_token');
    // var userId = this.authorize.getUserId();
    const baseUrl = this.baseUrl;
    var demourl = 'api/OnlineAppointmentRequestFile?userid=' + this.content.sn +
      '&sn=' + this.content.sn +
      '&file_type=ABOUT'
    this.http.get(baseUrl + "/api/OnlineAppointmentRequestFile?userid=" + this.content.sn + "&sn=" + this.content.sn + "&file_type=ABOUT"
      // baseUrl + demourl
      , { headers: { Authorization: 'Bearer ' + token } })
      .subscribe({

        next: data => this.storePic(data),
        error: res => console.log(res)

      }
      )
  }


  fileList: any;
  fileLink: any;
  storePic(res: any) {
    // console.log(res);
    this.fileList = res;
    this.fileList = this.fileList.filter((x: { published: boolean; }) => x.published === true);


    const baseUrl = this.baseUrl;

    this.fileLink =
      baseUrl + '/api/OnlineUploadFileDownload?userid=' + this.content.sn + '&sn=' + this.content.sn
    // '&file_type=ANGULAR'
    // fileLink = this.baseUrl + 'api/OnlineUploadFileDownload?userid='+vm.selectedBlog.sn+'&sn='+vm.selectedBlog.sn;
    // $scope.fileType = 'SERVICES';
  }





}
