import React, { useEffect, useState } from 'react';

interface Branch {
  id: number;
  name: string;
  address: string;
  manager: string;
  inventoryCount: number;
}

export const BranchList: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const fetchBranches = async () => {
    const res = await fetch("http://localhost:3000/api/branch/all");
    const data = await res.json();
    setBranches(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <div className="admin-card">
      <h3>Tổng quan chi nhánh</h3>

      {loading ? <p>Đang tải...</p> : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Quản lý</th>
              <th>Số lượng hàng</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {branches.map(branch => (
              <tr key={branch.id}>
                <td>#{branch.id}</td>
                <td>{branch.name}</td>
                <td>{branch.manager || "—"}</td>
                <td>{branch.inventoryCount}</td>
                <td>
                  <button
                    className="action-btn"
                    onClick={() => setSelectedBranch(branch)}
                  >
                    Xem
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Branch Detail Modal */}
      {selectedBranch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800">Chi tiết chi nhánh</h3>
              <button
                onClick={() => setSelectedBranch(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                  {selectedBranch.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedBranch.name}</h4>
                  <p className="text-gray-500">ID: #{selectedBranch.id}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <span className="text-sm text-gray-500 block mb-1">Địa chỉ</span>
                  <p className="font-medium text-gray-900">{selectedBranch.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <span className="text-sm text-gray-500 block mb-1">Quản lý</span>
                    <p className="font-medium text-gray-900">{selectedBranch.manager || "Chưa có"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <span className="text-sm text-gray-500 block mb-1">Tồn kho</span>
                    <p className="font-medium text-gray-900">{selectedBranch.inventoryCount} sản phẩm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedBranch(null)}
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
