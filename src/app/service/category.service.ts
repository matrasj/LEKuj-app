import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {CategoryQuery} from "../model/category/category-query";
import urlJoin from "url-join";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public resourceUrl: string = environment.API_URL + 'category'
  constructor(private httpClient: HttpClient) {
  }

  public getTopLevelCategories(): Observable<CategoryQuery[]> {
    return this.httpClient.get<CategoryQuery[]>(urlJoin(this.resourceUrl, 'top-level'));
  }

  public getChildren(categoryId: number): Observable<CategoryQuery[]> {
    return this.httpClient.get<CategoryQuery[]>(urlJoin(this.resourceUrl, 'children', `${categoryId}`));
  }
}
