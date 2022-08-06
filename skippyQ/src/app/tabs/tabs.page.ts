import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  role: string;
  constructor(private storage: Storage,
    ) {
      this.storage.create();
      this.storage.get("role").then(e => {
        this.role = e
        console.log(e)
      })
     }

}
