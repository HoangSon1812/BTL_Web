import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "../store/ToastContext";

const Footer: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      showToast("Vui lòng nhập email của bạn", "info");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      showToast("Email không hợp lệ", "error");
      return;
    }
    showToast("Đăng ký nhận tin thành công!", "success");
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div>
          <div className="text-2xl font-extrabold text-white mb-4 flex items-center gap-2">
            <span className="bg-red-600 text-white px-2 py-1 rounded">Mini</span>
            <span>Mart</span>
          </div>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Hệ thống cửa hàng tiện lợi hàng đầu dành cho sinh viên và gia đình trẻ.
            Cam kết chất lượng, giá cả hợp lý và dịch vụ tận tâm.
          </p>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
              <Facebook size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all">
              <Instagram size={18} />
            </a>
            <a href="mailto:support@minimart.vn" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
            Về chúng tôi
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-red-600 rounded-full"></span>
          </h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/page/about" className="hover:text-red-500 transition-colors">Giới thiệu MiniMart</Link></li>
            <li><Link to="/page/stores" className="hover:text-red-500 transition-colors">Hệ thống cửa hàng</Link></li>
            <li><Link to="/page/careers" className="hover:text-red-500 transition-colors">Tuyển dụng</Link></li>
            <li><Link to="/page/news" className="hover:text-red-500 transition-colors">Tin tức & Sự kiện</Link></li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
            Hỗ trợ khách hàng
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-red-600 rounded-full"></span>
          </h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/page/guide" className="hover:text-red-500 transition-colors">Hướng dẫn mua hàng</Link></li>
            <li><Link to="/page/shipping" className="hover:text-red-500 transition-colors">Chính sách giao hàng</Link></li>
            <li><Link to="/page/return" className="hover:text-red-500 transition-colors">Chính sách đổi trả</Link></li>
            <li><Link to="/page/privacy" className="hover:text-red-500 transition-colors">Bảo mật thông tin</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
            Liên hệ
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-red-600 rounded-full"></span>
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-red-500 mt-0.5 shrink-0" />
              <span>Số 123, Đường Trần Phú, Quận Hà Đông, Hà Nội</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-red-500 shrink-0" />
              <a href="tel:1900123456" className="hover:text-white transition-colors">1900 123 456</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-red-500 shrink-0" />
              <a href="mailto:support@minimart.vn" className="hover:text-white transition-colors">support@minimart.vn</a>
            </li>
          </ul>

          <div className="mt-6">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email nhận tin..."
                className="w-full bg-gray-800 text-white px-4 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700"
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
              />
              <button
                onClick={handleSubscribe}
                className="absolute right-1.5 top-1.5 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center">
        <p className="text-sm text-gray-500">
          © 2024 MiniMart. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
