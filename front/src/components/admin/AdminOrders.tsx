import React, { useEffect, useState } from "react";

interface Order {
  id: number;
  full_name: string;
  address: string;
  phone: string;
  total_price: number;
  order_date: string;
}

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);

  // 🟦 Lấy danh sách order từ DB
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/order/all");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // 🟦 Lấy chi tiết items của order
  const fetchOrderItems = async (orderId: number) => {
    try {
      const res = await fetch(`http://localhost:3000/api/order/${orderId}/items`);
      if (!res.ok) throw new Error("Failed to fetch order items");
      const data = await res.json();
      setOrderItems(data);
    } catch (error) {
      console.error("Error fetching order items:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Lịch sử đơn hàng (Từ Database)</h2>

      {/* 🟩 LIST ORDERS */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-semibold text-gray-600">ID</th>
              <th className="p-4 font-semibold text-gray-600">Họ tên</th>
              <th className="p-4 font-semibold text-gray-600">SĐT</th>
              <th className="p-4 font-semibold text-gray-600">Tổng tiền</th>
              <th className="p-4 font-semibold text-gray-600">Ngày đặt</th>
              <th className="p-4 font-semibold text-gray-600">Xem</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 text-gray-700">{order.id}</td>
                <td className="p-4 text-gray-700">{order.full_name}</td>
                <td className="p-4 text-gray-700">{order.phone}</td>
                <td className="p-4 font-medium text-red-600">{order.total_price?.toLocaleString()}đ</td>
                <td className="p-4 text-gray-500">{order.order_date}</td>
                <td className="p-4">
                  <button
                    onClick={() => {
                      setSelectedOrder(order.id);
                      fetchOrderItems(order.id);
                    }}
                    className="px-3 py-1.5 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors text-sm font-medium"
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🟩 ORDER DETAIL MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Chi tiết đơn hàng #{selectedOrder}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {orders.find(o => o.id === selectedOrder)?.order_date}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-bold text-blue-800 mb-2 text-sm uppercase tracking-wider">Thông tin khách hàng</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 block">Họ tên:</span>
                    <span className="font-medium text-gray-900">{orders.find(o => o.id === selectedOrder)?.full_name}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Số điện thoại:</span>
                    <span className="font-medium text-gray-900">{orders.find(o => o.id === selectedOrder)?.phone}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500 block">Địa chỉ:</span>
                    <span className="font-medium text-gray-900">{orders.find(o => o.id === selectedOrder)?.address}</span>
                  </div>
                </div>
              </div>

              <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Danh sách sản phẩm</h4>
              <div className="space-y-3">
                {orderItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
                    <img
                      src={item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `/images/${item.image_url}`) : "https://via.placeholder.com/80"}
                      alt={item.tenMatHang}
                      className="w-16 h-16 object-cover rounded-md border border-gray-100"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{item.tenMatHang}</p>
                      <p className="text-sm text-gray-500">Đơn giá: {item.price?.toLocaleString()}đ</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Số lượng</p>
                      <p className="font-bold text-gray-900">x{item.quantity}</p>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <p className="text-sm text-gray-500">Thành tiền</p>
                      <p className="font-bold text-red-600">{(item.price * item.quantity).toLocaleString()}đ</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="font-bold text-gray-600">Tổng cộng:</span>
                <span className="text-2xl font-extrabold text-red-600">
                  {orders.find(o => o.id === selectedOrder)?.total_price?.toLocaleString()}đ
                </span>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
