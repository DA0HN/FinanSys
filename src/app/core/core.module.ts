import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDatabase } from '@finan$ys/in-memory-database';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
  ],
  exports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
})
export class CoreModule {
}
