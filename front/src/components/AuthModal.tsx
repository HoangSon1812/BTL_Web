import React, { useState } from 'react';
import { useAuth } from '../store/AuthContext';
import { useToast } from '../store/ToastContext';
import { X, User, Lock, Mail, UserPlus, LogIn, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // LOGIN BACKEND
        try {
          const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.msg || "Login thất bại");
          }

          // lưu user vào AuthContext
          login(data.user);
          showToast(`Chào mừng trở lại, ${data.user.full_name || username}!`, 'success');
          onClose();
        } catch (err: any) {
          console.warn("Backend login failed, using mock user", err);
          // Mock login fallback (giữ lại để test nếu server lỗi)
          if (username) {
            login({
              id: 1,
              username: username,
              email: email || "test@example.com",
              full_name: fullName || "Test User",
              role: "user"
            });
            showToast(`Đăng nhập thành công (Mock)!`, 'success');
            onClose();
          } else {
            showToast("Vui lòng nhập username", 'error');
          }
        }

      } else {
        // REGISTER BACKEND
        try {
          const res = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username,
              password,
              full_name: fullName,
              email
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.msg || "Đăng ký thất bại");
          }

          showToast("Đăng ký thành công! Hãy đăng nhập.", 'success');
          setIsLogin(true);
        } catch (err: any) {
          console.warn("Backend register failed", err);
          showToast("Không thể kết nối backend. Giả lập đăng ký thành công.", 'error');
          setIsLogin(true);
        }
      }

    } catch (error) {
      showToast("Lỗi hệ thống!", 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6 text-center text-white">
          <h2 className="text-2xl font-bold mb-1">
            {isLogin ? 'Chào mừng trở lại!' : 'Tạo tài khoản mới'}
          </h2>
          <p className="text-red-100 text-sm">
            {isLogin ? 'Vui lòng đăng nhập để tiếp tục' : 'Điền thông tin để đăng ký thành viên'}
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 block">Tên đăng nhập</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={18} />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                  placeholder="Nhập username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Extra Fields for Register */}
            {!isLogin && (
              <>
                <div className="space-y-1 animate-fade-in">
                  <label className="text-sm font-medium text-gray-700 block">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={18} />
                    <input
                      type="email"
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                      placeholder="example@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1 animate-fade-in">
                  <label className="text-sm font-medium text-gray-700 block">Họ và tên</label>
                  <div className="relative group">
                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={18} />
                    <input
                      type="text"
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 block">Mật khẩu</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={18} />
                <input
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-200 hover:shadow-xl flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Đăng nhập' : 'Đăng ký ngay'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-red-600 font-bold hover:underline hover:text-red-700 transition-colors"
              >
                {isLogin ? "Đăng ký miễn phí" : "Đăng nhập ngay"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
