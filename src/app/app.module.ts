import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DealsComponent } from './deals/deals.component';
import { DealsService } from './deals/deals.service';

@NgModule({
  declarations: [
    AppComponent,
    DealsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpModule
  ],
  providers: [
    DealsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
