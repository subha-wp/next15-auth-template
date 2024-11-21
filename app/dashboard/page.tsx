import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const { user, session } = await validateRequest();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {user.email}</p>
      {/* <LogoutButton /> */}
    </div>
  );
}
