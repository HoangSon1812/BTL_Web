import React, { useState } from 'react';
import { useAdmin } from '../../store/AdminContext';
import { Employee } from '../../data/adminMock';

export const EmployeeList: React.FC = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee, branches } = useAdmin();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    branchId: branches[0]?.id || 0,
    email: '',
    phone: '',
    status: 'active' as 'active' | 'inactive'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      branchId: branches[0]?.id || 0,
      email: '',
      phone: '',
      status: 'active'
    });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (emp: Employee) => {
    setFormData({
      name: emp.name,
      position: emp.position,
      branchId: emp.branchId,
      email: emp.email,
      phone: emp.phone,
      status: emp.status
    });
    setEditingId(emp.id);
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateEmployee(editingId, formData);
    } else {
      addEmployee(formData);
    }
    resetForm();
  };

  return (
    <div className="admin-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>Quản lý nhân viên</h3>
        <button
          className={isAdding ? "btn-secondary" : "btn-primary"}
          onClick={() => {
            if (isAdding) resetForm();
            else setIsAdding(true);
          }}
        >
          {isAdding ? 'Hủy bỏ' : '+ Thêm nhân viên'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="admin-form" style={{ marginBottom: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
          <div className="form-group">
            <label>Tên</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Chức vụ</label>
            <input
              type="text"
              required
              value={formData.position}
              onChange={e => setFormData({ ...formData, position: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Chi nhánh</label>
            <select
              value={formData.branchId}
              onChange={e => setFormData({ ...formData, branchId: Number(e.target.value) })}
            >
              {branches.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>SĐT</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Trạng thái</label>
            <select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Ngưng hoạt động</option>
            </select>
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
            {editingId ? 'Cập nhật nhân viên' : 'Lưu nhân viên'}
          </button>
        </form>
      )}

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Chức vụ</th>
              <th>Mã CN</th>
              <th>Email</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>#{emp.branchId}</td>
                <td>{emp.email}</td>
                <td>
                  <span className={`badge ${emp.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                    {emp.status === 'active' ? 'Hoạt động' : 'Ngưng hoạt động'}
                  </span>
                </td>
                <td>
                  <button className="action-btn" onClick={() => handleEdit(emp)} style={{ marginRight: '0.5rem' }}>Sửa</button>
                  <button className="action-btn btn-danger-action" onClick={() => deleteEmployee(emp.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
