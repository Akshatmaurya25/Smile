export interface Category {
  id: string;
  userId: string;
  name: string;
  icon: string;
  color: string;
  isDefault: boolean;
  createdAt: Date;
  sortOrder: number;
}

export interface CategoryInput {
  name: string;
  icon: string;
  color: string;
}

export const DEFAULT_CATEGORIES: Omit<
  Category,
  'id' | 'userId' | 'createdAt'
>[] = [
  {
    name: 'Food & Dining',
    icon: 'restaurant',
    color: '#FF6B6B',
    isDefault: true,
    sortOrder: 0,
  },
  {
    name: 'Transportation',
    icon: 'car',
    color: '#4ECDC4',
    isDefault: true,
    sortOrder: 1,
  },
  {
    name: 'Shopping',
    icon: 'shopping-bag',
    color: '#A855F7',
    isDefault: true,
    sortOrder: 2,
  },
  {
    name: 'Entertainment',
    icon: 'film',
    color: '#FF006E',
    isDefault: true,
    sortOrder: 3,
  },
  {
    name: 'Bills & Utilities',
    icon: 'file-text',
    color: '#00FFD1',
    isDefault: true,
    sortOrder: 4,
  },
  {
    name: 'Health & Fitness',
    icon: 'heart',
    color: '#45B7D1',
    isDefault: true,
    sortOrder: 5,
  },
  {
    name: 'Education',
    icon: 'book',
    color: '#96CEB4',
    isDefault: true,
    sortOrder: 6,
  },
  {
    name: 'Other',
    icon: 'more-horizontal',
    color: '#606070',
    isDefault: true,
    sortOrder: 7,
  },
];
