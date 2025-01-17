import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.page.html',
  styleUrl: './side-menu.page.scss',
})
export class SideMenuPage {
  constructor(private router: Router, private alertService: AlertService) {}
  onLogout() {
    localStorage.clear();
    this.router.navigate(['/landing']);
    this.alertService.success('You have been logged out.');
  }
}
