import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const PAGE_CONTENT: Record<string, { title: string; content: React.ReactNode; image: string }> = {
    'about': {
        title: 'Giới thiệu MiniMart',
        image: '/images/info/about.jpg',
        content: (
            <div className="space-y-4">
                <p>Chào mừng bạn đến với <strong>MiniMart</strong> - Hệ thống cửa hàng tiện lợi hàng đầu dành cho sinh viên và gia đình trẻ.</p>
                <p>Được thành lập với sứ mệnh mang đến sự tiện lợi và chất lượng tốt nhất, MiniMart luôn nỗ lực không ngừng để cung cấp các sản phẩm đa dạng từ thực phẩm, đồ uống đến đồ gia dụng thiết yếu.</p>
                <p>Chúng tôi cam kết:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Sản phẩm chính hãng, nguồn gốc rõ ràng.</li>
                    <li>Giá cả hợp lý, phù hợp với túi tiền sinh viên.</li>
                    <li>Dịch vụ khách hàng tận tâm, chu đáo.</li>
                </ul>
            </div>
        )
    },
    'stores': {
        title: 'Hệ thống cửa hàng',
        image: '/images/info/stores.jpg',
        content: (
            <div className="space-y-4">
                <p>Hiện tại MiniMart đã có mặt tại các khu vực trọng điểm:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Cơ sở 1:</strong> 123 Trần Phú, Hà Đông, Hà Nội</li>
                    <li><strong>Cơ sở 2:</strong> 456 Nguyễn Trãi, Thanh Xuân, Hà Nội</li>
                    <li><strong>Cơ sở 3:</strong> 789 Cầu Giấy, Cầu Giấy, Hà Nội</li>
                </ul>
                <p>Chúng tôi đang tiếp tục mở rộng để phục vụ bạn tốt hơn!</p>
            </div>
        )
    },
    'careers': {
        title: 'Tuyển dụng',
        image: '/images/info/careers.jpg',
        content: (
            <div className="space-y-4">
                <p>MiniMart luôn chào đón những ứng viên năng động và nhiệt huyết.</p>
                <p>Các vị trí đang tuyển dụng:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Nhân viên bán hàng (Part-time/Full-time)</li>
                    <li>Quản lý cửa hàng</li>
                    <li>Nhân viên kho</li>
                </ul>
                <p>Gửi CV của bạn về email: <strong>hr@minimart.vn</strong></p>
            </div>
        )
    },
    'news': {
        title: 'Tin tức & Sự kiện',
        image: '/images/info/about.jpg',
        content: <p>Chưa có tin tức mới nào. Hãy quay lại sau nhé!</p>
    },
    'guide': {
        title: 'Hướng dẫn mua hàng',
        image: '/images/info/about.jpg', // Fallback
        content: (
            <div className="space-y-4">
                <p>Mua hàng tại MiniMart thật đơn giản:</p>
                <ol className="list-decimal pl-5 space-y-2">
                    <li>Tìm kiếm sản phẩm bạn cần.</li>
                    <li>Thêm vào giỏ hàng.</li>
                    <li>Kiểm tra giỏ hàng và tiến hành thanh toán.</li>
                    <li>Nhận hàng tại nhà hoặc đến cửa hàng lấy.</li>
                </ol>
            </div>
        )
    },
    'shipping': {
        title: 'Chính sách giao hàng',
        image: '/images/info/shipping.jpg',
        content: (
            <div className="space-y-4">
                <p>Chúng tôi hỗ trợ giao hàng nhanh trong vòng 2h tại nội thành Hà Nội.</p>
                <p>Phí giao hàng:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Đơn hàng &gt; 500k: Miễn phí</li>
                    <li>Đơn hàng &lt; 500k: 20.000đ - 30.000đ tùy khu vực</li>
                </ul>
            </div>
        )
    },
    'return': {
        title: 'Chính sách đổi trả',
        image: '/images/info/return.jpg',
        content: (
            <div className="space-y-4">
                <p>Đổi trả miễn phí trong vòng 7 ngày nếu sản phẩm có lỗi từ nhà sản xuất.</p>
                <p>Yêu cầu: Sản phẩm còn nguyên tem mác, chưa qua sử dụng.</p>
            </div>
        )
    },
    'privacy': {
        title: 'Bảo mật thông tin',
        image: '/images/info/privacy.jpg',
        content: <p>Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng và không chia sẻ với bên thứ ba.</p>
    }
};

export const InfoPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const data = slug && PAGE_CONTENT[slug] ? PAGE_CONTENT[slug] : { title: 'Trang không tồn tại', content: 'Nội dung không có sẵn.', image: '' };

    // Scroll to top when slug changes
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [slug]);

    // Mock handlers for Navbar to allow navigation back to home
    const handleNavigateHome = () => navigate('/');

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar
                activeCategory="all"
                onCategoryChange={handleNavigateHome}
                search=""
                onSearchChange={handleNavigateHome}
                onOpenAuth={() => { }}
                onOpenOrderHistory={() => { }}
                onOpenWishlist={() => { }}
            />

            <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 animate-fade-in">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {data.image && (
                        <div className="h-64 w-full relative">
                            <img
                                src={data.image}
                                alt={data.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none'; // Hide if broken
                                }}
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-end">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-white p-8 drop-shadow-lg">
                                    {data.title}
                                </h1>
                            </div>
                        </div>
                    )}

                    <div className="p-8 md:p-12">
                        {!data.image && (
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 pb-4 border-b border-gray-100">
                                {data.title}
                            </h1>
                        )}
                        <div className="prose prose-lg text-gray-600">
                            {data.content}
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
                            <button
                                onClick={handleNavigateHome}
                                className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                <ArrowLeft size={20} />
                                <span>Quay về trang chủ</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};
