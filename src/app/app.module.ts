import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PostModule } from './post/post.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './post/search/search.component';

@NgModule({
  declarations: [AppComponent, SearchComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PostModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
