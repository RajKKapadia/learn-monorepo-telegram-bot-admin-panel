# Telegram Bot Admin Panel

A pnpm monorepo with a Telegram bot, a Next.js admin panel, and shared packages for database access, environment config, and TypeScript types.

## Workspace Structure

```text
apps/
  admin/        Next.js admin panel for viewing bot users
  bot/          grammY Telegram bot

packages/
  config/       Shared environment loading and validation
  db/           Drizzle schema, database client, migrations, and query functions
  types/        Shared TypeScript types
```

## Requirements

- Node.js
- pnpm 11
- PostgreSQL database URL
- Telegram bot token

## Environment

Create a root `.env` file:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
TELEGRAM_BOT_TOKEN="your-telegram-bot-token"
```

The `@repo/config` package loads env files from the current app/package directory and from the repository root. The root `.env` is the recommended place for shared local development config.

## Install

```bash
pnpm install
```

## Database

Run migrations:

```bash
pnpm db:migrate
```

Generate a new migration after changing `packages/db/src/schema.ts`:

```bash
pnpm --filter @repo/db db:generate
```

Open Drizzle Studio:

```bash
pnpm --filter @repo/db db:studio
```

## Development

Start the Telegram bot:

```bash
pnpm dev:bot
```

Start the admin panel:

```bash
pnpm dev:admin
```

The admin app runs at:

```text
http://localhost:3000
```

## App Flow

1. A user starts the Telegram bot.
2. The bot calls `saveTelegramUser` from `@repo/db`.
3. The user is saved or updated in the `users` table.
4. The admin home page calls `getUsers` from `@repo/db`.
5. The admin panel renders the saved users.

## Useful Commands

```bash
pnpm typecheck
pnpm --filter @repo/admin build
pnpm --filter bot typecheck
pnpm --filter @repo/db typecheck
```

## Package Responsibilities

- `@repo/config`: loads env files and exposes validated runtime config.
- `@repo/types`: owns shared data types such as `User` and `SaveTelegramUserInput`.
- `@repo/db`: owns Drizzle schema, DB client setup, migrations, and DB functions.
- `bot`: handles Telegram updates and saves users through `@repo/db`.
- `@repo/admin`: renders the admin UI and reads users through `@repo/db`.
