import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IProduct } from '../models/interfaces';
import { Product } from '../models/product';

import { ProductService } from '../services/product.service';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productList: Product[];
  productForm: FormGroup;

  companyId: string;
  companyName: string;

  submitted: boolean;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private companyService: CompanyService,
    private formBuilder: FormBuilder
  ) {
    this.productList = [];

    this.submitted = false;

    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      createDate: [''],
      status: [true],
    });

  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.companyId = params.id;

      this.getNameOfCompany();

      this.getProducts();
    });

  }

  getNameOfCompany(): void {

    this.companyService.getComapnyName(this.companyId).subscribe(
      name => {
        this.companyName = name;
      }
    );

  }

  getProducts(): void {

    this.productService.getProductByCompanyId(this.companyId).subscribe(
      result => {
        this.productList = result;
      }
    );

  }

  get f() { return this.productForm.controls; }

  onSubmit(productInfo): void {
    this.submitted = true;
    if (this.productForm.valid) {
      productInfo.idCompany = this.companyId;
      this.productService.createProduct(productInfo).subscribe(
        data => {
          console.log('POST Request is successful ', data);
          this.productForm.reset();
          this.productForm.controls.status.setValue(true);
          this.submitted = false;
          this.getProducts();
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

  removeProduct(idProduct) {
    this.productService.removeProduct(idProduct).subscribe(
      () => {
        this.getProducts();
      },
      error => {
        console.log('Error', error);
      }
    );
  }

}
