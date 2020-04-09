import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  product={
    Name:'',
    Price:0
  }
  constructor(private data:DataService) { }

  ngOnInit() {
  }
  OnSubmit(Product){
    //console.log(Product);
    this.data.NewProduct(Product).subscribe(d=>console.log(d));
  }
  get diagnostic() { return JSON.stringify(this.product); }

}
