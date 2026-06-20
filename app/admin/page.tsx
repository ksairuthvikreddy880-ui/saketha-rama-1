import { redirect } from "next/navigation";
import DashboardStats from "@/components/admin/DashboardStats";
import RecentBlogsTable from "@/components/admin/RecentBlogsTable";

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSize: "2rem",
        fontWeight: "600",
        color: "#111827",
        marginBottom: "2rem",
      }}>
        Dashboard
      </h1>

      <DashboardStats />
      <RecentBlogsTable />
    </div>
  );
}
