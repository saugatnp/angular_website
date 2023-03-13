import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading: boolean[] = [];


  constructor(public loaderService: LoaderService,
    private cd: ChangeDetectorRef
  ) {

    this.loaderService.isLoading.subscribe((val: boolean) => {
      if (val) {
        this.isLoading.push(val);
        this.cd.detectChanges()
      } else {
        this.isLoading.pop();
      }
    });
  }

  ngOnInit(): void {
    // this.loaderService.show()


  }

  ngAfterViewInit() {
    this.loaderService.hide();
    this.cd.detectChanges()
  }
}
