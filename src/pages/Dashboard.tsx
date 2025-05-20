import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import StatCard from "../components/dashboard/StatCard";
import RecentOrders from "../components/dashboard/RecentOrders";

// app/dashboard/page.tsx



import MarketingChart from "../components/dashboard/MarketingChart";

import SalesSummaryChart from "../components/dashboard/SalesSummaryChart";

export default function DashboardPage() {
  return (
    <div className="w-screen min-h-screen flex">
      
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Header />

        <div className="grid grid-cols-4 gap-4 mb-4">
          <StatCard title="Sales" value="0.00" change="+0.00%" />
          <StatCard title="Customers" value={0} change="+0.00%" />
          <StatCard title="All Orders" value={0} change="+0.00%" />
          <StatCard title="All Products" value={0} change="+0.00%" highlight />
        </div>

        <div className="mb-4">
          <MarketingChart />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <RecentOrders />
          <SalesSummaryChart />
        </div>
      </main>
    </div>
  );
}

