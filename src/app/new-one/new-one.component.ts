import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-new-one',
  templateUrl: './new-one.component.html',
  styleUrls: ['./new-one.component.css']
})
export class NewOneComponent implements OnInit {
  customer={
    ShopName:'',
    Amount:0
  }
  constructor(private data:DataService) { }

  ngOnInit() {
  }
  OnSubmit(customer){
    this.data.NewC(customer).subscribe(d=>console.log(d));
  }
  get diagnostic() { return JSON.stringify(this.customer); }
}
