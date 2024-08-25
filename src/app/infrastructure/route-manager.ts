export class RouteManager {
  public static getHome(): string[] {
    return [''];
  }

  public static getQuestionForm(categoryId: number): string[] {
    return ['question-form', `${categoryId}`];
  }
}
