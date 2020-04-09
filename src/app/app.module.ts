import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { NewOneComponent } from './new-one/new-one.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NewProductComponent } from './new-product/new-product.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    NewOneComponent,
    NewProductComponent,
    OrderlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
