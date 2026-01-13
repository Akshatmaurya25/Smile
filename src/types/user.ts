export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'JPY' | 'CAD' | 'AUD';

export interface UserSettings {
  currency: CurrencyCode;
  notifications: boolean;
  weekStartsOn: 0 | 1;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  username: string;
  photoURL: string | null;
  createdAt: Date;
  updatedAt: Date;
  settings: UserSettings;
}

export interface UserInput {
  email: string;
  displayName: string;
  photoURL?: string;
}

export const DEFAULT_USER_SETTINGS: UserSettings = {
  currency: 'USD',
  notifications: true,
  weekStartsOn: 1,
};
