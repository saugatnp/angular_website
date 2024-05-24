import { Component, OnInit } from '@angular/core';
import { BroadcastService } from '../../services/broadcast.service';
import { SettingsGroup } from '../admin/settings/settings.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {


  settings = new SettingsGroup()
  
  constructor(
    private BroadCastservice: BroadcastService,
  ) { 
    this.BroadCastservice.currentSettings.subscribe((dataSub: any) => {
      this.settings = dataSub;
    })

  }

  ngOnInit(): void {
  }

}
