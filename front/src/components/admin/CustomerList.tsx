import React from 'react';
import { useAdmin } from '../../store/AdminContext';

export const CustomerList: React.FC = () => {
  const { customers } = useAdmin();

  return (
    <div className="admin-card">
      <h3>Khách hàng đã mua</h3>
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Tổng đơn</th>
              <th>Tổng chi tiêu</th>
              <th>Lần mua cuối</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>#{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.totalOrders}</td>
                <td>{customer.totalSpent.toLocaleString()}đ</td>
                <td>{customer.lastPurchaseDate}</td>
                <td>
                  <span className={`badge ${customer.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                    {customer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
