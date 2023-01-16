import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
})
export class ServicesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const img=localStorage.getItem('img')
    if(img){
      this.selectedImage=img;
    }
  }

  selectedImage:string=''

}
