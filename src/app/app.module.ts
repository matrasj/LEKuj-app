import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './infrastructure/footer/footer.component';
import { CategoriesTreeComponent } from './main-view/categories-tree/categories-tree.component';
import {HeaderComponent} from "./infrastructure/header/header.component";
import { LoaderComponent } from './shared/loader/loader.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {CategoryPreviewPipe} from "./pipe/category-preview.pipe";
import { SpinnerComponent } from './shared/spinner/spinner.component';
import {ToastrModule} from "ngx-toastr";
import { QuestionFromComponent } from './main-view/question-from/question-from.component';
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NumberToLetterPipe} from "./pipe/number-to-letter.pipe";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesTreeComponent,
    LoaderComponent,
    CategoryPreviewPipe,
    NumberToLetterPipe,
    SpinnerComponent,
    QuestionFromComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      closeButton: true
    }),
    MatTableModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
