import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  serverUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  getCustomers(){
    console.log('data service called');
    return this.http.get(this.serverUrl+'/customers');
  }
  NewC(customer){
    return this.http.post(this.serverUrl+'/customers',customer);
  }
  getProducts(){
    return this.http.get(this.serverUrl+'/products');
  }
  NewProduct(product){
    return this.http.post(this.serverUrl+'/products',product);
  }
  AddItems(ind,arr,amount){
    return this.http.post(this.serverUrl+'/item',{ind,arr,amount});
  }
  deleteItems(Arr){
    return this.http.post(this.serverUrl+'/deleteItem',{Arr});
  }
}
