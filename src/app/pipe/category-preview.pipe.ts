import {CategoryQuery} from "../model/category/category-query";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'categoryPreview'
})
export class CategoryPreviewPipe implements PipeTransform {

  transform(categoryQuery: CategoryQuery): string {
    return `${categoryQuery.name} (${categoryQuery.questionsQuantity} pytań)`;
  }
}
