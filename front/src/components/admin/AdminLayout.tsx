import React from 'react';
import { useAuth } from '../../store/AuthContext';
import {
  LayoutDashboard,
  ShoppingCart,
  Store,
  Package,
  Users,
  UserCog,
  LogOut
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { logout, user } = useAuth();

  // 🟦 Lấy hash đang active (#dashboard, #orders,...)
  const current = window.location.hash;

  return (
    <div className="admin-container font-sans">
      <aside className="admin-sidebar sticky top-0 h-screen overflow-y-auto">

        {/* Logo */}
        <div className="admin-logo">
          <Store size={28} />
          <span>Admin Panel</span>
        </div>

        {/* Username */}
        <div className="px-4 mb-6 text-sm text-gray-500 font-medium text-center">
          Xin chào, <span className="text-gray-900 font-bold">{user?.username}</span>
        </div>

        {/* Navigation */}
        <nav className="admin-nav flex-1">

          <a
            href="#dashboard"
            className={`admin-nav-link ${current === "#dashboard" || current === "" ? "active" : ""}`}
          >
            <LayoutDashboard size={20} />
            <span>Tổng quan</span>
          </a>

          <a
            href="#orders"
            className={`admin-nav-link ${current === "#orders" ? "active" : ""}`}
          >
            <ShoppingCart size={20} />
            <span>Đơn hàng</span>
          </a>

          <a
            href="#branches"
            className={`admin-nav-link ${current === "#branches" ? "active" : ""}`}
          >
            <Store size={20} />
            <span>Chi nhánh</span>
          </a>

          <a
            href="#inventory"
            className={`admin-nav-link ${current === "#inventory" ? "active" : ""}`}
          >
            <Package size={20} />
            <span>Kho hàng</span>
          </a>

          <a
            href="#customers"
            className={`admin-nav-link ${current === "#customers" ? "active" : ""}`}
          >
            <Users size={20} />
            <span>Khách hàng</span>
          </a>

          <a
            href="#employees"
            className={`admin-nav-link ${current === "#employees" ? "active" : ""}`}
          >
            <UserCog size={20} />
            <span>Nhân viên</span>
          </a>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto pt-6 border-t border-gray-100">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-semibold"
          >
            <LogOut size={18} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      <main className="admin-content flex-1 min-w-0 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
