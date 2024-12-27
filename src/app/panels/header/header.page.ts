import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  public pageTitle: string = '';

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((res: NavigationEnd) => {
        const urlSegments = res.url
          .split('/')
          .filter((segment: string) => segment);
        this.pageTitle = this.capitalizeFirstLetter(
          urlSegments[urlSegments.length - 1]
        );

        // Close menu if open
        if (this.menuCtrl.isOpen()) {
          this.menuCtrl.close();
        }
      });
  }

  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
