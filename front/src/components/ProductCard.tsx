import React from "react";
import { Product } from "../types/product";
import { useCart } from "../store/CartContext";
import { useWishlist } from "../store/WishlistContext";
import { useToast } from "../store/ToastContext";
import { ShoppingCart, Heart, Plus } from "lucide-react";

type ProductCardProps = {
  product: Product;
  onClick?: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const name =
    product.tenMatHang ||
    product.ten_mat_hang ||
    "Sản phẩm";

  const description =
    product.moTa || product.mo_ta || "";

  const price =
    product.donGia || product.don_gia || 0;

  const stock =
    product.soLuongTon || product.so_luong_ton || 0;

  const imageUrl =
    product.image_url ||
    "https://via.placeholder.com/300x200?text=No+Image";

  // Random "Sale" or "New" badge for demo purposes
  const isSale = Math.random() > 0.7;
  const isNew = !isSale && Math.random() > 0.7;

  const isLiked = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      isLiked
        ? `Đã xóa "${name}" khỏi danh sách yêu thích`
        : `Đã thêm "${name}" vào danh sách yêu thích`,
      'info'
    );
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    showToast(`Đã thêm "${name}" vào giỏ hàng`, 'success');
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden relative cursor-pointer"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {isSale && (
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
            GIẢM GIÁ
          </span>
        )}
        {isNew && (
          <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
            MỚI
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-colors shadow-sm transform translate-y-2 group-hover:translate-y-0 duration-300 ${isLiked
          ? "bg-red-50 text-red-600 opacity-100"
          : "bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white opacity-0 group-hover:opacity-100"
          }`}
      >
        <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
      </button>

      <div className="relative h-64 overflow-hidden bg-white flex items-center justify-center p-4">
        <img
          src={product.image_url?.startsWith('http') ? product.image_url : `/images/${product.image_url}`}
          alt={name}
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <h3 className="font-bold text-gray-800 text-lg line-clamp-1 group-hover:text-red-600 transition-colors">
            {name}
          </h3>
          <p className="text-gray-500 text-xs line-clamp-2 mt-1 h-8">
            {description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-red-600 font-extrabold text-lg">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(price)}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">
              Kho: {stock}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all shadow-md active:scale-95"
          >
            <Plus size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Thêm</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
