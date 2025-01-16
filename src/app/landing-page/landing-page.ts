import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonButton, IonicModule, ModalController } from '@ionic/angular';
import {
  Color,
  LegendPosition,
  NgxChartsModule,
  ScaleType,
} from '@swimlane/ngx-charts';
import { LoginDesktopPage } from '../auth/login-desktop/login-desktop.page';

export var single = [
  {
    name: 'Germany',
    value: 8940000,
  },
  {
    name: 'USA',
    value: 5000000,
  },
  {
    name: 'France',
    value: 7200000,
  },
  {
    name: 'UK',
    value: 6200000,
  },
];

interface EventItem {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
  standalone: true,
  imports: [NgxChartsModule, RouterModule, IonicModule],
})
export class LandingPage {
  title = 'TechCo-RTI';
  single: any[] = [];
  view: [number, number] = [600, 470];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme: string | Color = {
    domain: ['#F89D3E', '#E54C7A', '#2AA5AA', '#AEBF30'], // Array of color codes
    selectable: true, // Optional: Indicates if the color scheme is selectable
    name: 'custom-scheme', // Optional: Name of the color scheme
    group: ScaleType.Linear, // Optional: Group for the color scheme
  };

  constructor(private modalController: ModalController) {
    Object.assign(this, { single });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  async login() {
    const modal = await this.modalController.create({
      component: LoginDesktopPage,
    });
    return await modal.present();
  }
}
