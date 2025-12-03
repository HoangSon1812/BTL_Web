import React from 'react';
import { useWishlist } from '../store/WishlistContext';
import { useCart } from '../store/CartContext';
import { Product } from '../types/product';

interface WishlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({ isOpen, onClose }) => {
    const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart();

    if (!isOpen) return null;

    const handleAddToCart = (product: Product) => {
        addToCart(product);
        alert(`Đã thêm "${product.tenMatHang || product.ten_mat_hang}" vào giỏ hàng`);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-scale-in">
                {/* Header */}
                <div className="p-5 border-b flex items-center justify-between bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="text-red-600">♥</span> Danh sách yêu thích
                        <span className="text-sm font-normal text-gray-500">({wishlist.length} sản phẩm)</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5">
                    {wishlist.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-3xl text-gray-300">
                                ♥
                            </div>
                            <p className="text-gray-500 font-medium">Danh sách yêu thích trống</p>
                            <p className="text-sm text-gray-400 mt-1">Hãy thêm những món đồ bạn thích vào đây nhé!</p>
                            <button
                                onClick={onClose}
                                className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
                            >
                                Tiếp tục mua sắm
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {wishlist.map((item) => (
                                <div key={item.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-white">
                                    {/* Image */}
                                    <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                        <img
                                            src={item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `/images/${item.image_url}`) : "https://via.placeholder.com/150"}
                                            alt={item.tenMatHang || "Sản phẩm"}
                                            className="w-full h-full object-cover"
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
                                            <h3 className="font-bold text-gray-800 line-clamp-1">
                                                {item.tenMatHang || item.ten_mat_hang || "Sản phẩm"}
                                            </h3>
                                            <p className="text-red-600 font-bold mt-1">
                                                {new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(item.donGia || item.don_gia || 0)}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3 mt-3">
                                            <button
                                                onClick={() => handleAddToCart(item)}
                                                className="flex-1 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold uppercase rounded-lg hover:bg-gray-800 transition-colors"
                                            >
                                                Thêm vào giỏ
                                            </button>
                                            <button
                                                onClick={() => removeFromWishlist(item.id)}
                                                className="px-3 py-1.5 border border-gray-200 text-gray-500 text-xs font-bold uppercase rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                                            >
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
                    <div className="p-5 border-t bg-gray-50 flex justify-end">
                        <button
                            onClick={clearWishlist}
                            className="text-sm text-red-600 hover:underline font-medium"
                        >
                            Xóa tất cả
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
