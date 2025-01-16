import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app/app.state';
import { loadCompanies } from 'src/app/store/rti/admin/company/admin-companies.actions';
import { selectCompanies } from 'src/app/store/rti/admin/company/admin-companies.selectors';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss'],
})
export class CompanyPage implements OnInit {
  companyControl = new FormControl();

  companies$ = this.store.select(selectCompanies);

  company: number;

  constructor(
    private store: Store<AppState>,
    private companyService: CompanyService
  ) {
    this.store.dispatch(loadCompanies());
  }

  ngOnInit() {
    this.companyControl.valueChanges.subscribe((value) => {
      console.log('Selected company ID:', value);
      this.company = value;
      this.companyService.setCompany(value);
    });
  }
}
