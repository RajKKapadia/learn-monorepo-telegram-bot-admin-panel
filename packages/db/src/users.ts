import type { SaveTelegramUserInput, User } from "@repo/types";
import { desc } from "drizzle-orm";

import { db } from "./client";
import { users } from "./schema";

type UserRow = typeof users.$inferSelect;

function toUser(row: UserRow): User {
  return {
    id: row.id,
    telegramId: row.telegramId,
    username: row.username,
    firstName: row.firstName,
    lastName: row.lastName,
    createdAt: row.createdAt
  };
}

export async function saveTelegramUser(input: SaveTelegramUserInput): Promise<User> {
  const [user] = await db
    .insert(users)
    .values({
      telegramId: input.telegramId,
      username: input.username ?? null,
      firstName: input.firstName ?? null,
      lastName: input.lastName ?? null
    })
    .onConflictDoUpdate({
      target: users.telegramId,
      set: {
        username: input.username ?? null,
        firstName: input.firstName ?? null,
        lastName: input.lastName ?? null
      }
    })
    .returning();

  return toUser(user);
}

export async function getUsers(): Promise<User[]> {
  const rows = await db.select().from(users).orderBy(desc(users.createdAt));

  return rows.map(toUser);
}
