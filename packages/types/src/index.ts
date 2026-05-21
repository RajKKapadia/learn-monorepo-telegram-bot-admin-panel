export type User = {
  id: number;
  telegramId: number;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  createdAt: Date;
};

export type SaveTelegramUserInput = {
  telegramId: number;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};
