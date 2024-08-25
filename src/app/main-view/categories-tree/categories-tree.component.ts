import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../service/category.service";
import {finalize} from "rxjs";
import {CategoryQuery} from "../../model/category/category-query";
import {ToastrService} from "ngx-toastr";
import {RouteManager} from "../../infrastructure/route-manager";

@Component({
  selector: 'app-categories-tree',
  templateUrl: './categories-tree.component.html',
  styleUrls: ['./categories-tree.component.scss']
})
export class CategoriesTreeComponent implements OnInit {
  public readonly RouterManager = RouteManager;
  public isLoading: boolean = false;
  public categories: CategoryQuery[] = [];
  public loadingCategoryIds: number[] = [];
  public expandedCategoryIds: number[] = [];
  constructor(private categoryService: CategoryService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchTopLevelCategories();
  }

  public toggleCategory(categoryId: number): void {
    const expanding: boolean = !this.expandedCategoryIds.includes(categoryId);
    if (!expanding) {
      this.categories = this.categories.filter(category => category.parentCategoryId !== categoryId);
      this.expandedCategoryIds = this.expandedCategoryIds.filter(id => id !== categoryId);
      return;
    }

    this.loadingCategoryIds.push(categoryId);
    this.categoryService.getChildren(categoryId)
      .pipe(finalize(() => this.loadingCategoryIds = this.loadingCategoryIds.filter(id => id !== categoryId)))
      .subscribe({
        next: (children) => {
          const index = this.categories.findIndex(category => category.id === categoryId);
          const beforeWithCategory = this.categories.slice(0, index + 1);
          const restOfCategories = this.categories.slice(index + 1);

          this.categories = [
            ...beforeWithCategory,
            ...children,
            ...restOfCategories
          ];
          this.expandedCategoryIds.push(categoryId);
        },
        error: (err) => this.toastr.error('Wystąpił błąd podczas pobierania kategorii')
      })
  }

  private fetchTopLevelCategories(): void {
    this.isLoading = true;
    this.categoryService.getTopLevelCategories()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (res) => this.categories = res,
        error: (err) => this.toastr.error('Wystąpił błąd podczas pobierania kategorii.')
      });
  }
}
