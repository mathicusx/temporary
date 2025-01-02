import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditRegionPage } from './region/region.page';

@Component({
  selector: 'app-region-action-cell-renderer',
  template: `
    <ion-button
      color="tertiary"
      (click)="onEdit()"
      class="btn btn-primary btn-sm"
      >Edit</ion-button
    >
    <ion-button
      color="danger"
      (click)="onDelete()"
      class="btn btn-danger btn-sm"
      >Delete</ion-button
    >
  `,
  styles: [
    `
      .btn {
        margin-right: 5px;
      }
    `,
  ],
})
export class RegionActionCellRendererComponent {
  params: any;

  constructor(private modalController: ModalController) {}

  agInit(params: any): void {
    this.params = params;
  }

  async onEdit() {
    const rowData = this.params.data; // Access the row data
    console.log('Edit clicked for:', rowData);
    const modal = await this.modalController.create({
      component: EditRegionPage,
      componentProps: {
        Region: rowData,
      },
    });
    return await modal.present();
  }

  onDelete() {
    const rowData = this.params.data; // Access the row data
    console.log('Delete clicked for:', rowData);
    // Perform delete logic here
  }
}
