import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Observable } from 'rxjs';
import { PageContentService } from 'src/app/content/services/pagecontent.service';
import { JsonAppConfigService } from 'src/config/json-app-config.service';
import { PageContent } from './pagecontent.model';

@Component({
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
})
export class AdminAboutComponent implements OnInit {


  editor = ClassicEditor as unknown as {
    create: any;
  };

  public model = {
    editorData: ''
  };

  baseUrl = ''
  constructor(private appconfig: JsonAppConfigService,
    private contentService: PageContentService

  ) {
    this.baseUrl = appconfig.baseUrl;

    // contentService.getPageContent().subscribe(x => {
    //        .map(epics => epics.filter(epic => epic.id === id)[0]);
      
    // })
  }

  ngOnInit(): void {

    this.getEpic()
  }



  contents: any=[];
content=new PageContent();

  getEpic() {
    this.contentService.getPageContent().subscribe(
      {
        next: res => this.contents=res,
        error: res => this.Error(res),
        complete:()=>this.filterData()
      }

    )
  }

  filterData(){
  this.contents=  this.contents.filter((x: { page_group: string; }) => x.page_group==="about");

  }
  Error(res: any): void {
    throw new Error('Method not implemented.');
  }


selectedContent=[]
  selectContent(x:any){
this.selectedContent=x;
this.model.editorData=x.page_text;
  }


}
