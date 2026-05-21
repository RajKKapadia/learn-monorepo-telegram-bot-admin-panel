import { getUsers } from "@repo/db";
import type { User } from "@repo/types";

export const dynamic = "force-dynamic";

function getDisplayName(user: User): string {
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ");

  return name || user.username || `Telegram user ${user.telegramId}`;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

export default async function Home() {
  const users = await getUsers();

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-8 text-zinc-950 sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-2 border-b border-zinc-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-zinc-500">
              Admin
            </p>
            <h1 className="text-3xl font-semibold tracking-normal text-zinc-950">
              Telegram Users
            </h1>
          </div>
          <div className="text-sm text-zinc-600">
            {users.length} total {users.length === 1 ? "user" : "users"}
          </div>
        </header>

        <section className="overflow-hidden border border-zinc-200 bg-white">
          {users.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <h2 className="text-base font-semibold text-zinc-950">
                No users yet
              </h2>
              <p className="mt-1 text-sm text-zinc-600">
                Users will appear here after they start the Telegram bot.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-190 border-collapse text-left text-sm">
                <thead className="bg-zinc-100 text-xs uppercase tracking-[0.08em] text-zinc-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Username</th>
                    <th className="px-4 py-3 font-semibold">Telegram ID</th>
                    <th className="px-4 py-3 font-semibold">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-zinc-50">
                      <td className="px-4 py-3 font-medium text-zinc-950">
                        {getDisplayName(user)}
                      </td>
                      <td className="px-4 py-3 text-zinc-700">
                        {user.username ? `@${user.username}` : "-"}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-zinc-700">
                        {user.telegramId}
                      </td>
                      <td className="px-4 py-3 text-zinc-700">
                        {formatDate(user.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
