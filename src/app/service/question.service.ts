import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QuestionCommand} from "../model/question/question-command";
import {QuestionQuery} from "../model/question/question-query";
import urlJoin from "url-join";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  public resourceUrl: string = environment.API_URL + 'question'
  constructor(private httpClient: HttpClient) {
  }

  public saveQuestion(questionCommand: QuestionCommand): Observable<QuestionQuery> {
    return this.httpClient.post<QuestionQuery>(this.resourceUrl, questionCommand);
  }

  public getById(questionId: number): Observable<QuestionQuery> {
    return this.httpClient.get<QuestionQuery>(urlJoin(this.resourceUrl, `${questionId}`));
  }
}
