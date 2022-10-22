import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDatabase } from '@finan$ys/in-memory-database';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NavbarComponent } from '@finan$ys/core/components';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
  ],
  exports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    NavbarComponent,
  ],
})
export class CoreModule {
}
