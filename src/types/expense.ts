import type {Category} from './category';

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  categoryId: string;
  category?: Category;
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExpenseInput {
  amount: number;
  categoryId: string;
  description: string;
  date: Date;
}

export interface ExpenseFilters {
  startDate?: Date;
  endDate?: Date;
  categoryId?: string;
  minAmount?: number;
  maxAmount?: number;
  searchQuery?: string;
}

export interface ExpenseSummary {
  total: number;
  count: number;
  average: number;
  highestExpense: Expense | null;
  byCategory: CategoryTotal[];
}

export interface CategoryTotal {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
  total: number;
  percentage: number;
  count: number;
}

export interface TrendData {
  date: string;
  amount: number;
  label: string;
}
