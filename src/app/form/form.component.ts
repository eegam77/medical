import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { identifierName } from '@angular/compiler';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  products;
  customers;
  selected;
  cart=[];
  amount=0;
  ind;
  constructor(private data:DataService) { }

  ngOnInit() {
    this.data.getProducts().subscribe(p => {
      this.products = p;
    });
    this.data.getCustomers().subscribe(d => {
      this.customers = d;
    });
  }
  setName(){
    console.log(this.selected);
  }
  add(i){
    var j=i.toString();
    var s=parseInt(document.getElementById("count"+j).textContent);
    s++;
    document.getElementById("count"+j).textContent=s.toString();
    document.getElementById("m"+j).setAttribute("style","display:inline");
    var item={
      Name:this.products[i].Name,
      Price:this.products[i].Price,
      Quantity:s,
      Time:new Date().toLocaleString()
    }
    this.ind=this.cart.findIndex(e => e.Name === item.Name);
    if(this.ind==-1){
      this.amount+=item.Price*item.Quantity;
      console.log(this.amount);
      this.cart.push(item);
    }
    else{
       this.cart[this.ind].Quantity++;
       this.amount+=this.cart[this.ind].Price;
       console.log(this.amount);
     }
    console.log(this.cart);
  }
  check(i){
    var j=i.toString();
    var s=parseInt(document.getElementById("count"+j).textContent);
    if(s==1){
      document.getElementById("m"+j).setAttribute("style","display:none")
    }
    else
      document.getElementById("m"+j).setAttribute("style","display:inline")
  }
  remove(i){
    var j=i.toString();
    var s=parseInt(document.getElementById("count"+j).textContent);
    if(s>0)
    s--;
    document.getElementById("count"+j).textContent=s.toString();
    var item={
      Name:this.products[i].Name,
      Price:this.products[i].Price,
      Quantity:s,
      Time:new Date().toLocaleString()
    }
    this.ind=this.cart.findIndex(e => e.Name === item.Name);
    this.cart[this.ind].Quantity--;
    this.amount-=this.cart[this.ind].Price;
    console.log(this.amount);
    console.log(this.cart);
  }
  OnSubmit(){
    this.data.AddItems(this.customers[this.selected].ShopName,this.cart,this.amount).subscribe(d=>console.log(d));
  }
}