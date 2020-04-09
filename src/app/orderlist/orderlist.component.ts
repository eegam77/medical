import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';
@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  customers;
  form:FormGroup;
  constructor(private data:DataService, private fb:FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
   }

  ngOnInit() {
    this.data.getCustomers().subscribe(d => {
      this.customers = d;
    });
  }
  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  submitForm() {
    this.data.deleteItems(this.form.value.checkArray).subscribe(d => {
      console.log(this.form.value.checkArray);
    });
    this.data.getCustomers().subscribe(d => {
      this.customers = d;
    });
    }
  }
