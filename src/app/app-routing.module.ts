import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriesTreeComponent} from "./main-view/categories-tree/categories-tree.component";
import {QuestionFromComponent} from "./main-view/question-from/question-from.component";

const routes: Routes = [
  { path: '', component: CategoriesTreeComponent },
  { path: 'question-form/:categoryId', component: QuestionFromComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
