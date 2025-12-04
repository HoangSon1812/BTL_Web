import React from 'react';

const Hero: React.FC = () => {
    return (
        <div className="relative bg-gradient-to-r from-red-600 to-red-800 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay"></div>

            <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 relative z-10 flex flex-col items-center text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-6 border border-white/30">
                    Chào mừng đến với MiniMart Online
                </span>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                    Mua sắm tiện lợi,<br />
                    <span className="text-yellow-300">Giao hàng tận nơi</span>
                </h1>

                <p className="text-lg sm:text-xl text-red-100 max-w-2xl mb-10">
                    Khám phá hàng ngàn sản phẩm chất lượng cao với giá tốt nhất.
                    Đồ gia dụng, thực phẩm tươi sống, và nhiều hơn thế nữa.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <button
                        onClick={() => {
                            const element = document.getElementById('product-list');
                            element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-4 bg-white text-red-700 font-bold rounded-full hover:bg-gray-100 transition shadow-lg transform hover:-translate-y-1 animate-float"
                    >
                        Mua ngay
                    </button>
                </div>

                <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center w-full max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
                        <div className="text-3xl font-bold text-yellow-300">100%</div>
                        <div className="text-sm text-red-100">Chính hãng</div>
                    </div>
                    <div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
                        <div className="text-3xl font-bold text-yellow-300">24/7</div>
                        <div className="text-sm text-red-100">Hỗ trợ</div>
                    </div>
                    <div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
                        <div className="text-3xl font-bold text-yellow-300">Free</div>
                        <div className="text-sm text-red-100">Vận chuyển</div>
                    </div>
                    <div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
                        <div className="text-3xl font-bold text-yellow-300">30</div>
                        <div className="text-sm text-red-100">Ngày đổi trả</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
