import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { JsonAppConfigService } from 'src/config/json-app-config.service';
import { Settings, SettingsGroup } from '../../pages/admin/settings/settings.model';
import { PageContentService } from '../../services/pagecontent.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {

  show: boolean = true;
  baseUrl = ''
  constructor(private router: Router,
    private http: HttpClient,
    private pagecontent: PageContentService,
    private appconfig: JsonAppConfigService,

  ) {
    this.baseUrl = this.appconfig.localUrl;
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
    this.getPageContent()
    this.getSettings()
    this.year = formatDate(new Date(), 'yyyy', 'EN-US')

  }

  year: any = ''
  contents: any = []
  getPageContent() {
    this.pagecontent.getPageContent().subscribe({
      next: res => this.storeContent(res),
      error: err => console.log(err)

    })


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

  storeContent(res: any) {
    this.contents = res.filter((x: { page_group: string, published: boolean }) => (x.page_group == 'about' || x.page_group == 'services') && x.published == true);

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

    this.router.navigate(['/Page/' + x]);
    // location.reload();
  }


}
