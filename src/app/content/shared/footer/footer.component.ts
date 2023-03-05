import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { PageContentService } from '../../services/pagecontent.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {

  show: boolean = true;
  constructor(private router: Router,
    private http: HttpClient,
    private pagecontent: PageContentService) { }

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

    this.year= formatDate(new Date(),'yyyy','EN-US')

  }

  year:any=''
  contents: any = []
  getPageContent() {
    this.pagecontent.getPageContent().subscribe({
      next: res => this.storeContent(res),
      error: err => console.log(err)

    })


  }


  storeContent(res: any) {
    this.contents = res.filter((x: { page_group: string, published: boolean  }) => (x.page_group=='about' || x.page_group=='services' )  && x.published == true );

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

  gotoPage(x:any){

    this.router.navigate(['/Page/'+x]);
    // location.reload();
  }


}
