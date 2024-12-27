import { Component } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-panels',
  templateUrl: './panels.page.html',
  styleUrl: './panels.page.scss',
})
export class PanelsPage {
  public activeTab: string = '';

  onTabChange(tabs: any) {
    console.log(tabs);
    this.activeTab = tabs.getSelected();
    console.log(this.activeTab);
  }
}
