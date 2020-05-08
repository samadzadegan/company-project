import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Company } from '../models/company';
import { ICompany } from '../models/interfaces';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  public companyList: Company[];
  public companyForm: FormGroup;

  submitted: boolean;

  types = [
    { label: 'Electronic Devices', value: 'Electronic Devices' },
    { label: 'Edible Products', value: 'Edible Products' },
    { label: 'Home Appliances', value: 'Home Appliances' }
  ];

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
  ) {

    this.companyList = [];

    this.submitted = false;

    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      telephone: ['', Validators.pattern('[0-9 ]{11}')],
      type: ['', Validators.required],
    });

  }

  ngOnInit(): void {

    this.getCompanyList();
  }

  getCompanyList(): void {
    this.companyService.getCompanies().subscribe(
      result => {
        this.companyList = result;
      }
    );
  }

  get f() { return this.companyForm.controls; }

  onSubmit(companyInfo): void {
    this.submitted = true;
    if (this.companyForm.valid) {
      this.companyService.createCompany(companyInfo).subscribe(
        data => {
          console.log('POST Request is successful ', data);
          this.companyForm.reset();
          this.submitted = false;
          this.getCompanyList();
        },
        error => {
          console.log('Error', error);
        }
      );
    } else {
      console.log('invalid');
      return;
    }

  }

  removeCompany(idCompany) {
    this.companyService.removeCompany(idCompany).subscribe(
      () => {
        this.getCompanyList();
      },
      error => {
        console.log('Error', error);
      }
    );
  }

}
