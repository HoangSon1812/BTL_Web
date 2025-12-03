import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../components/admin/AdminLayout';
import { BranchList } from '../components/admin/BranchList';
import { InventoryOverview } from '../components/admin/InventoryOverview';
import { EmployeeList } from '../components/admin/EmployeeList';
import { CustomerList } from '../components/admin/CustomerList';
import { AdminOrders } from '../components/admin/AdminOrders';
import { useAdmin } from '../store/AdminContext';
import { Store, Users, UserCog, Activity, TrendingUp } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { branches, employees, customers, transactions } = useAdmin();
  const [activePage, setActivePage] = useState("dashboard");

  // 🔥 Theo dõi thay đổi hashtag
  useEffect(() => {
    const updatePage = () => {
      const hash = window.location.hash.replace("#", "");
      setActivePage(hash || "dashboard");
    };

    updatePage();
    window.addEventListener("hashchange", updatePage);

    return () => window.removeEventListener("hashchange", updatePage);
  }, []);

  // 🔥 Render theo activePage
  const renderPage = () => {
    switch (activePage) {
      case "orders":
        return <AdminOrders />;

      case "branches":
        return <BranchList />;

      case "inventory":
        return <InventoryOverview />;

      case "customers":
        return <CustomerList />;

      case "employees":
        return <EmployeeList />;

      default:  // dashboard
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Tổng quan hệ thống</h2>
              <span className="text-sm text-gray-500">Cập nhật lần cuối: {new Date().toLocaleTimeString()}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Branches */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Store size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Tổng chi nhánh</p>
                  <p className="text-2xl font-bold text-gray-900">{branches.length}</p>
                </div>
              </div>

              {/* Card 2: Employees */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                  <UserCog size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Tổng nhân viên</p>
                  <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
                </div>
              </div>

              {/* Card 3: Customers */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Khách hàng</p>
                  <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
                </div>
              </div>

              {/* Card 4: Transactions */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                  <Activity size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Giao dịch gần đây</p>
                  <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity Section (Mock) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="text-red-600" size={20} />
                <h3 className="text-lg font-bold text-gray-800">Hoạt động gần đây</h3>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Đơn hàng mới #ORD-{1000 + i}</p>
                      <p className="text-xs text-gray-500">Vừa xong - Khách hàng Nguyễn Văn {String.fromCharCode(65 + i)}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-900">+ {500 + i * 100}.000 ₫</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return <AdminLayout>{renderPage()}</AdminLayout>;
};
