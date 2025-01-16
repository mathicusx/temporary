import { Component, OnDestroy } from '@angular/core';
import { AppState } from './store/app/app.state';
import { Store } from '@ngrx/store';
import { selectGlobalLoaderStatus } from './store/app/global-variables/global-variables.reducer';
import { Subject, takeUntil } from 'rxjs';
import { fade } from './_animations/animations';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [fade],
})
export class AppComponent implements OnDestroy {
  globalLoader: any = false;

  onDestroy = new Subject<boolean>();

  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private store: Store<AppState>) {
    this.store
      .select(selectGlobalLoaderStatus)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((globalLoader) => (this.globalLoader = globalLoader));
      
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
