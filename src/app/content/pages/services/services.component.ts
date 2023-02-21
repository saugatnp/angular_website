import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
})
export class ServicesComponent implements OnInit {
  service : string = 'Neurology';
  constructor() { 
    this.topFunction()
  }

  ngOnInit(): void {
    const img=localStorage.getItem('img')
    if(img){
      this.selectedImage=img;
    }
  }
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  selectedImage:string=''

}
