import React, { useState } from 'react';
import { useCart } from '../store/CartContext';
import { useOrder } from '../store/OrderContext';
import { CreditCard, MapPin, Phone, User, ShoppingBag, X } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, totalPrice, clearCart, toggleCart } = useCart();
  const { addOrder } = useOrder();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ⭐ LƯU TẠM TRÊN FRONTEND
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      items: cart,
      total: totalPrice,
      shippingInfo: { name, address, phone }
    };

    addOrder(newOrder);

    // ⭐ GỬI API VỀ BACKEND
    try {
      const res = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: name,
          address,
          phone,
          total_price: totalPrice,
          items: cart.map(item => ({
            product_id: item.id,     // 🔥 ID sản phẩm trong DB
            quantity: item.quantity, // 🔥 Số lượng đặt
            price: item.donGia        // 🔥 Giá tại thời điểm mua
          }))
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Đặt hàng thất bại!");
        setLoading(false);
        return;
      }

      alert("Đặt hàng thành công!");

    } catch (err) {
      console.warn("Backend unavailable, order placed locally", err);
      alert("Đặt hàng thành công (Chế độ Offline)!");
    }

    // RESET UI
    setLoading(false);
    clearCart();
    toggleCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">

        {/* HEADER */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <CreditCard className="text-red-600" />
            Thanh toán
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {/* ORDER SUMMARY */}
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                <ShoppingBag size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Tổng đơn hàng</p>
                <p className="text-lg font-bold text-gray-900">{totalPrice.toLocaleString()} ₫</p>
              </div>
            </div>
            <p className="text-xs text-blue-600 font-medium ml-14">
              {cart.reduce((acc, item) => acc + item.quantity, 0)} sản phẩm trong giỏ hàng
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  required
                  placeholder="0912 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ nhận hàng</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                <textarea
                  required
                  placeholder="Số 123, Đường ABC, Quận XYZ..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
