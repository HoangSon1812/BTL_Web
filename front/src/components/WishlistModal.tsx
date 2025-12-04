import React from 'react';
import { useWishlist } from '../store/WishlistContext';
import { useCart } from '../store/CartContext';
import { useToast } from '../store/ToastContext';
import { Product } from '../types/product';
import { Heart, ShoppingBag, Trash2, X } from 'lucide-react';

interface WishlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({ isOpen, onClose }) => {
    const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { showToast } = useToast();

    if (!isOpen) return null;

    const handleAddToCart = (product: Product) => {
        addToCart(product);
        showToast(`Đã thêm "${product.tenMatHang || product.ten_mat_hang}" vào giỏ hàng`, 'success');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-5 border-b flex items-center justify-between bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Heart className="w-6 h-6 text-red-600 fill-red-600" />
                        Danh sách yêu thích
                        <span className="text-sm font-normal text-gray-500 ml-1">({wishlist.length} sản phẩm)</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5 bg-gray-50/50">
                    {wishlist.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4 animate-bounce-slow">
                                <Heart className="w-10 h-10 text-red-400" />
                            </div>
                            <p className="text-gray-800 font-bold text-lg">Danh sách yêu thích trống</p>
                            <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
                                Hãy "thả tim" những món đồ bạn thích để lưu lại và xem sau nhé!
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-6 px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-all hover:shadow-lg active:scale-95"
                            >
                                Tiếp tục mua sắm
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {wishlist.map((item) => (
                                <div
                                    key={item.id}
                                    className="group flex gap-4 p-4 border border-gray-100 rounded-xl bg-white hover:shadow-lg hover:border-red-100 transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* Image */}
                                    <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 relative">
                                        <img
                                            src={item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `/images/${item.image_url}`) : "https://via.placeholder.com/150"}
                                            alt={item.tenMatHang || "Sản phẩm"}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = "https://via.placeholder.com/150";
                                            }}
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-bold text-gray-800 line-clamp-1 text-lg group-hover:text-red-600 transition-colors">
                                                {item.tenMatHang || item.ten_mat_hang || "Sản phẩm"}
                                            </h3>
                                            <p className="text-red-600 font-bold mt-1 text-lg">
                                                {new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(item.donGia || item.don_gia || 0)}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3 mt-3">
                                            <button
                                                onClick={() => handleAddToCart(item)}
                                                className="flex-1 px-4 py-2 bg-gray-900 text-white text-xs font-bold uppercase rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <ShoppingBag className="w-3.5 h-3.5" />
                                                Thêm vào giỏ
                                            </button>
                                            <button
                                                onClick={() => removeFromWishlist(item.id)}
                                                className="px-4 py-2 border border-gray-200 text-gray-500 text-xs font-bold uppercase rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors flex items-center gap-2"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {wishlist.length > 0 && (
                    <div className="p-5 border-t bg-gray-50 flex justify-between items-center">
                        <span className="text-xs text-gray-400 font-medium">
                            Mẹo: Thêm vào giỏ hàng để mua ngay
                        </span>
                        <button
                            onClick={clearWishlist}
                            className="text-sm text-red-600 hover:text-red-700 hover:underline font-bold flex items-center gap-1"
                        >
                            <Trash2 className="w-4 h-4" />
                            Xóa tất cả
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
