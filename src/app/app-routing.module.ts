import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {NewOneComponent } from './new-one/new-one.component';
import { FormComponent } from './form/form.component'
import { NewProductComponent } from './new-product/new-product.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
const routes: Routes = [
  {path:'', component:FormComponent},
  {path:'NewOne',component:NewOneComponent},
  {path:'NewProduct',component:NewProductComponent},
  {path:'orders',component:OrderlistComponent},
  {path:'**',component:FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
