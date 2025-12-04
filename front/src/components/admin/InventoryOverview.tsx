import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X, Save, Search } from "lucide-react";

interface Product {
  id: number;
  tenMatHang: string;
  soLuongTon: number;
  donGia: number;
  image_url: string;
  moTa?: string;
}

export const InventoryOverview: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({});
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const isEdit = !!editingProduct.id;
    const url = isEdit
      ? `http://localhost:3000/api/products/${editingProduct.id}`
      : "http://localhost:3000/api/products";

    const method = isEdit ? "PUT" : "POST";

    // Ensure safe values for DB
    const payload = {
      ...editingProduct,
      moTa: editingProduct.moTa || "",
      image_url: editingProduct.image_url || "",
      soLuongTon: Number(editingProduct.soLuongTon),
      donGia: Number(editingProduct.donGia)
    };

    // console.log("Saving product:", payload);

    try {
      // console.log("Sending request to:", url, "Method:", method, "Body:", payload);
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // console.log("Response status:", res.status, "OK:", res.ok);
      const data = await res.json();
      // console.log("Response data:", data);

      if (res.ok) {
        // alert(isEdit ? "Cập nhật thành công!" : "Thêm mới thành công!");
        setIsModalOpen(false);
        fetchProducts();
      } else {
        console.error("Server error:", data);
        setError(`Có lỗi xảy ra: ${data.msg} ${data.error ? `(${data.error})` : ""}`);
      }
    } catch (err) {
      console.error("Error saving product:", err);
      setError("Lỗi kết nối đến server! Xem console để biết thêm chi tiết.");
    }
  };

  // Delete Confirmation State
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setDeleteConfirmationId(id);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmationId) return;
    const id = deleteConfirmationId;

    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
        // alert("Xóa thành công!"); // Optional: remove alert for smoother UX
      } else {
        alert(`Lỗi khi xóa sản phẩm: ${data.msg || ""} ${data.error || ""}`);
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Lỗi kết nối server");
    } finally {
      setDeleteConfirmationId(null);
    }
  };

  const openAddModal = () => {
    setEditingProduct({
      tenMatHang: "",
      soLuongTon: 0,
      donGia: 0,
      image_url: "",
      moTa: ""
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter(p =>
    p.tenMatHang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Kho hàng</h3>
        <button
          onClick={openAddModal}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Thêm sản phẩm
        </button>
      </div>

      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="admin-table w-full">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Sản phẩm</th>
                <th>Tồn kho</th>
                <th>Đơn giá</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.image_url ? (p.image_url.startsWith('http') ? p.image_url : `/images/${p.image_url}`) : "https://via.placeholder.com/50?text=No+Img"}
                      alt={p.tenMatHang}
                      width={50}
                      height={50}
                      className="object-cover rounded-md border border-gray-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://via.placeholder.com/50?text=No+Img";
                      }}
                    />
                  </td>
                  <td className="font-medium text-gray-900">{p.tenMatHang}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.soLuongTon > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {p.soLuongTon}
                    </span>
                  </td>
                  <td>{p.donGia.toLocaleString()}đ</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Sửa"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(p.id);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmationId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1100] animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Xác nhận xóa</h3>
            <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmationId(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Xóa ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ADD/EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800">
                {editingProduct.id ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editingProduct.tenMatHang || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tenMatHang: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Đơn giá (VNĐ)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editingProduct.donGia || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, donGia: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng tồn</label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editingProduct.soLuongTon || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, soLuongTon: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Hình ảnh</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://... hoặc tên file trong /images/"
                  value={editingProduct.image_url || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={editingProduct.moTa || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, moTa: e.target.value })}
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                >
                  <Save size={18} />
                  Lưu lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
