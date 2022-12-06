import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { routes } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpBackend,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { MockBackend } from './tools/mock-backend';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    // Comment below to use real backend
    MockBackend,
    {
      provide: HttpClient,
      useFactory: (backend: HttpBackend) => new HttpClient(backend),
      deps: [MockBackend],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
