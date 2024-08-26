import {AnswerQuery} from "../answer/answer-query";

export interface QuestionQuery {
  id: number;
  content: string;
  categoryId: number;
  answers: AnswerQuery[];
}
