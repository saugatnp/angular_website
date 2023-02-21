import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PageContentService } from 'src/app/content/services/pagecontent.service';
import { JsonAppConfigService } from 'src/config/json-app-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class AdminHomeComponent implements OnInit {

  editor = ClassicEditor as unknown as {
    create: any;
  };

  public model = {
    editorData: ''
  };

  baseUrl = ''
  contents: any = [];
  constructor(private appconfig: JsonAppConfigService,
    private contentService: PageContentService

  ) {
    this.baseUrl = appconfig.baseUrl;

    contentService.getPageContent().subscribe(x => {
      this.contents = x
    })
  }

selectedContent=[]
  selectContent(x:any){
this.selectedContent=x;
this.model.editorData=x.page_text;
  }


  ngOnInit(): void {
  }

}
