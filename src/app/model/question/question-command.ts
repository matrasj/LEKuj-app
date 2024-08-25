import {AnswerCommand} from "../answer/answer-command";

export interface QuestionCommand {
  questionId: number;
  categoryId: number;
  content: number;
  answers: AnswerCommand[];
}
