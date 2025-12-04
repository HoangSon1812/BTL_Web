import React from 'react';
import { Product } from '../types/product';
import { useCart } from '../store/CartContext';
import { useWishlist } from '../store/WishlistContext';
import { useToast } from '../store/ToastContext';
import { ShoppingCart, Heart, X } from 'lucide-react';

interface ProductDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    allProducts?: Product[];
    onProductSelect?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ isOpen, onClose, product, allProducts = [], onProductSelect }) => {
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { showToast } = useToast();

    if (!isOpen || !product) return null;

    const name = product.tenMatHang || product.ten_mat_hang || "Sản phẩm";
    const description = product.moTa || product.mo_ta || "Chưa có mô tả cho sản phẩm này.";
    const price = product.donGia || product.don_gia || 0;
    const stock = product.soLuongTon || product.so_luong_ton || 0;
    const imageUrl = product.image_url
        ? (product.image_url.startsWith('http') ? product.image_url : `/images/${product.image_url}`)
        : "https://via.placeholder.com/600x400?text=No+Image";
    const unit = product.donViTinh || product.don_vi_tinh || "Cái";

    const isLiked = isInWishlist(product.id);

    // Filter related products (same category, exclude current)
    const relatedProducts = allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const handleAddToCart = () => {
        addToCart(product);
        showToast(`Đã thêm "${name}" vào giỏ hàng`, 'success');
    };

    const handleWishlist = () => {
        toggleWishlist(product);
        showToast(
            isLiked
                ? `Đã xóa "${name}" khỏi danh sách yêu thích`
                : `Đã thêm "${name}" vào danh sách yêu thích`,
            'info'
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col animate-scale-in relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 relative group overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-50 to-gray-100 min-h-[300px] md:min-h-[400px]">
                        <img
                            src={imageUrl}
                            alt={name}
                            className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = "https://via.placeholder.com/600x400?text=No+Image";
                            }}
                        />
                    </div>

                    {/* Info Section */}
                    <div className="w-full md:w-1/2 p-8 flex flex-col">
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                                    {product.category || 'Sản phẩm'}
                                </span>
                                {stock > 0 ? (
                                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                                        Còn hàng
                                    </span>
                                ) : (
                                    <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                                        Hết hàng
                                    </span>
                                )}
                            </div>

                            <h2 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">{name}</h2>

                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-3xl font-extrabold text-red-600">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(price)}
                                </span>
                                <span className="text-gray-500 text-sm">/ {unit}</span>
                            </div>
                        </div>

                        <div className="prose prose-sm text-gray-600 mb-8 flex-1">
                            <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wide mb-2">Mô tả sản phẩm</h3>
                            <p className="leading-relaxed">{description}</p>
                        </div>

                        <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-4">
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                                <span>Tình trạng kho:</span>
                                <span className="font-medium text-gray-900">{stock} sản phẩm có sẵn</span>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-red-600 text-white py-3.5 px-6 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart size={20} />
                                    Thêm vào giỏ hàng
                                </button>

                                <button
                                    onClick={handleWishlist}
                                    className={`p-3.5 rounded-xl border transition-all flex items-center justify-center ${isLiked
                                        ? "bg-red-50 border-red-200 text-red-600"
                                        : "border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-600"
                                        }`}
                                >
                                    <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="p-8 bg-gray-50 border-t border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Sản phẩm liên quan</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {relatedProducts.map(rp => (
                                <div
                                    key={rp.id}
                                    className="bg-white rounded-lg shadow-sm p-3 border border-gray-100 flex flex-col cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => onProductSelect?.(rp)}
                                >
                                    <div className="h-32 bg-white rounded mb-2 overflow-hidden flex items-center justify-center p-2">
                                        <img
                                            src={rp.image_url?.startsWith('http') ? rp.image_url : `/images/${rp.image_url || ''}`}
                                            alt={rp.tenMatHang}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <h4 className="font-medium text-sm text-gray-800 line-clamp-2 mb-1">{rp.tenMatHang}</h4>
                                    <div className="mt-auto font-bold text-red-600 text-sm">
                                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(rp.donGia || 0)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
