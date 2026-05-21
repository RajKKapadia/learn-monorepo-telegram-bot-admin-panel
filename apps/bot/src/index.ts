import { getTelegramBotToken } from "@repo/config";
import { saveTelegramUser } from "@repo/db";
import { Bot } from "grammy";

const bot = new Bot(getTelegramBotToken());

bot.command("start", async (ctx) => {
    const from = ctx.from;

    if (!from) {
        await ctx.reply("Could not read your Telegram profile.");
        return;
    }

    await saveTelegramUser({
        telegramId: from.id,
        username: from.username,
        firstName: from.first_name,
        lastName: from.last_name
    });

    await ctx.reply("Welcome! Your profile has been created.");
});

bot.on("message:text", async (ctx) => {
    await ctx.reply(`You said: ${ctx.message.text}`);
});

bot.start();

console.log("Telegram bot is running...");
