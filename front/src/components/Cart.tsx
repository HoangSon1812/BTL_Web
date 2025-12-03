import React, { useState } from 'react';
import { useCart } from '../store/CartContext';
import { useAuth } from '../store/AuthContext';
import { CheckoutModal } from './CheckoutModal';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, toggleCart } = useCart();
  const { user } = useAuth();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (!user) {
      alert("Vui lòng đăng nhập để thanh toán.");
      return;
    }
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 animate-fade-in" onClick={toggleCart}></div>

      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>

        {/* HEADER */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="text-red-600" />
            Giỏ hàng của bạn
            <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          </h2>
          <button onClick={toggleCart} className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* CART ITEMS */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="text-gray-300" size={40} />
              </div>
              <div>
                <p className="text-gray-800 font-medium text-lg">Giỏ hàng trống</p>
                <p className="text-gray-500 text-sm mt-1">Hãy thêm vài món đồ ngon lành vào nhé!</p>
              </div>
              <button
                onClick={toggleCart}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                {/* HÌNH ẢNH */}
                <div className="w-20 h-20 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                  <img
                    src={item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `/images/${item.image_url}`) : "https://via.placeholder.com/80"}
                    alt={item.tenMatHang}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-800 line-clamp-1">{item.tenMatHang}</h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-red-600 font-bold text-sm mt-1">
                      {(item.donGia || 0).toLocaleString()} ₫
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-red-600 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-red-600"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500">Tổng cộng</span>
              <span className="text-2xl font-extrabold text-red-600">
                {totalPrice.toLocaleString()} ₫
              </span>
            </div>

            <button
              className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-all shadow-lg active:scale-[0.98]"
              onClick={handleCheckout}
            >
              {user ? 'Thanh toán ngay' : 'Đăng nhập để thanh toán'}
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* MODAL CHECKOUT */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
};
