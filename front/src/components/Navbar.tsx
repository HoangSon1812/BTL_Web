import React, { useState } from "react";
import { useCart } from "../store/CartContext";
import { useAuth } from "../store/AuthContext";
import { useWishlist } from "../store/WishlistContext";
import { ShoppingCart, Heart, User, Search, FileText, MapPin, Phone, LogOut } from "lucide-react";

const CATEGORY_LABELS: Record<string, string> = {
  all: "Tất cả",
  dogiadung: "Đồ gia dụng",
  dientu: "Điện tử",
  thucpham: "Thực phẩm",
  douong: "Đồ uống",
};

type CategoryKey = keyof typeof CATEGORY_LABELS;

type NavbarProps = {
  activeCategory: CategoryKey;
  onCategoryChange: (cat: CategoryKey) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onOpenAuth: () => void;
  onOpenOrderHistory: () => void;
  onOpenWishlist: () => void;
};

const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onCategoryChange,
  search,
  onSearchChange,
  onOpenAuth,
  onOpenOrderHistory,
  onOpenWishlist,
}) => {
  const [searchInput, setSearchInput] = useState(search);
  const { toggleCart, totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { user, logout } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchInput);
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="bg-red-600 text-white text-xs sm:text-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-x-4 gap-y-1 px-3 py-1">
          <span className="font-semibold">MiniMart Online</span>

          <span className="flex items-center gap-1">
            <MapPin size={14} className="text-yellow-200" /> Hà Đông - Hà Nội
          </span>
          <span className="flex items-center gap-1 ml-auto">
            <Phone size={14} className="text-yellow-200" /> 0123 456 789
          </span>
        </div>
      </div>

      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-3 py-3 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onCategoryChange('all')}>
            <div className="h-9 w-9 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
              M
            </div>
            <div className="leading-tight">
              <p className="font-bold text-lg text-gray-900">MiniMart</p>
              <p className="text-xs text-gray-500">Student Convenience</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex-1 min-w-[220px] flex items-center gap-2"
          >
            <div className="flex-1 flex border border-gray-300 rounded-md overflow-hidden focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500">
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Nhập tên sản phẩm..."
                className="flex-1 px-3 py-2 text-sm outline-none"
              />
              <button
                type="submit"
                className="bg-red-600 px-4 text-xs sm:text-sm font-semibold text-white hover:bg-red-700 transition flex items-center justify-center"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-3 text-xs sm:text-sm">
            {user && (
              <button
                onClick={onOpenOrderHistory}
                className="border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50 flex items-center gap-1 transition"
              >
                <FileText size={16} /> <span className="hidden sm:inline">Đơn hàng</span>
              </button>
            )}

            <button
              onClick={onOpenWishlist}
              className="border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50 flex items-center gap-1 transition relative"
            >
              <Heart size={16} /> <span className="hidden sm:inline">Yêu thích</span>
              {totalWishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalWishlistItems}
                </span>
              )}
            </button>

            <button
              onClick={toggleCart}
              className="border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50 flex items-center gap-1 transition relative"
            >
              <ShoppingCart size={16} /> <span className="hidden sm:inline">Giỏ hàng</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 flex items-center gap-1"><User size={16} /> {user.username}</span>
                <button
                  onClick={logout}
                  className="text-red-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <LogOut size={16} /> Đăng xuất
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="text-red-600 font-semibold hover:underline flex items-center gap-1"
              >
                <User size={16} /> Đăng nhập
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
