export interface CategoryQuery {
  id: number;
  name: string;
  level: number;
  parentCategoryId: number;
  questionsQuantity: number;
  hasNestedCategories: boolean;
}
