import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { config as loadDotenv } from "dotenv";

const packageSourceDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(packageSourceDir, "../../..");

const envFiles = [
  resolve(process.cwd(), ".env.local"),
  resolve(process.cwd(), ".env"),
  resolve(repoRoot, ".env.local"),
  resolve(repoRoot, ".env"),
];

for (const envFile of new Set(envFiles)) {
  if (existsSync(envFile)) {
    loadDotenv({ path: envFile, quiet: true });
  }
}

export function getEnv(name: string): string | undefined {
  const value = process.env[name];

  if (!value || value.trim().length === 0) {
    return undefined;
  }

  return value;
}

export function requireEnv(name: string): string {
  const value = getEnv(name);

  if (!value) {
    throw new Error(
      `${name} is missing. Add it to the repository root .env file or export it before starting the app.`,
    );
  }

  return value;
}

export const appConfig = {
  database: {
    url: requireEnv("DATABASE_URL"),
  },
  telegram: {
    botToken: getEnv("TELEGRAM_BOT_TOKEN"),
  },
  nodeEnv: getEnv("NODE_ENV") ?? "development",
  googleMapApiKey: getEnv("GOOGLE_MAP_API_KEY") ?? "",
};

export function getTelegramBotToken(): string {
  return requireEnv("TELEGRAM_BOT_TOKEN");
}
