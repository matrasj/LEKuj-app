import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {combineLatest, finalize, retry} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {RouteManager} from "../../infrastructure/route-manager";
import {QuestionCommand} from "../../model/question/question-command";
import {AnswerCommand} from "../../model/answer/answer-command";
import {QuestionService} from "../../service/question.service";

interface Answer {
  contentControl: FormControl;
  correctControl: FormControl;
}
@Component({
  selector: 'app-question-from',
  templateUrl: './question-from.component.html',
  styleUrls: ['./question-from.component.scss']
})
export class QuestionFromComponent implements OnInit {
  public readonly RouterManager = RouteManager;
  public isLoading: boolean = false;
  public categoryId: number | null = null;
  public categoryName: string | null = null;
  public contentControl: FormControl = new FormControl(null, [Validators.required])
  public answers: Answer[] = [];
  constructor(private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private questionService: QuestionService,
              private router: Router) { }

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.paramMap,
      this.activatedRoute.queryParamMap
    ]).subscribe(([params, queryParams]) => {
      this.categoryId = Number(params.get('categoryId'));
      this.categoryName = queryParams.get('categoryName');
    });
  }

  public addNewAnswer(): void {
    this.answers.push({
      contentControl: new FormControl(null, [Validators.required]),
      correctControl: new FormControl(false)
    } as Answer);
  }

  public deleteAnswer(index: number): void {
    if (index > -1 && index < this.answers.length) {
      this.answers.splice(index, 1);
    }
  }

  public saveQuestion(): void {
    if (this.answers.find(control => control.contentControl.invalid) !== undefined || this.contentControl.invalid) {
      this.toastr.warning('Formularz zawiera błędy');
      this.answers.forEach(control => control.contentControl.markAsTouched());
      this.contentControl.markAsTouched();
      return;
    }

    this.isLoading = true;
    this.questionService.saveQuestion(this.questionCommand)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (res) => {
          this.toastr.success('Pomyślnie utworzono pytanie dla kategorii: ' + this.categoryName);
          this.router.navigate(RouteManager.getHome())
        },
        error: (err) => this.toastr.error('Wystąpił błąd podczas tworzenia pytania dla kategorii: ' + this.categoryName)
      });

  }

  private get questionCommand(): QuestionCommand {
    return {
      questionId: 1,
      content: this.contentControl.value,
      categoryId: this.categoryId,
      answers: this.answers.map(answerControl => {
        return {
          content: answerControl.contentControl.value,
          correct: answerControl.correctControl.value
        } as AnswerCommand;
      })
    } as QuestionCommand;
  }
}
