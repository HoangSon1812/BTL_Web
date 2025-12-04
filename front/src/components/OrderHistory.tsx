import React from 'react';
import { useOrder } from '../store/OrderContext';
import { Package, MapPin, Calendar, DollarSign, X } from 'lucide-react';

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ isOpen, onClose }) => {
  const { orders } = useOrder();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="text-red-600" />
            Lịch sử đơn hàng
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-600 transition-colors p-1 hover:bg-red-50 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 bg-gray-50/50 flex-1">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="text-gray-400" size={32} />
              </div>
              <p className="text-gray-500 font-medium">Bạn chưa có đơn hàng nào.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">

                  {/* === ORDER HEADER === */}
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-700">#{order.id}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Thành công</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar size={14} />
                      <span>{order.date}</span>
                    </div>
                  </div>

                  {/* === ORDER ITEMS === */}
                  <div className="p-4 space-y-3">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-500">
                            {item.quantity}x
                          </div>
                          <span className="font-medium text-gray-800">{item.tenMatHang}</span>
                        </div>
                        <span className="text-gray-600">
                          {((item.donGia || 0) * item.quantity).toLocaleString()} ₫
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* === ORDER FOOTER === */}
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-end">
                    <div className="text-sm text-gray-500 flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-red-500" />
                        <span>Giao tới: {order.shippingInfo.address}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500 block">Tổng tiền</span>
                      <strong className="text-red-600 text-lg flex items-center justify-end gap-1">
                        {order.total.toLocaleString()} ₫
                      </strong>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
