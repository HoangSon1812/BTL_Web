import React, { useState } from 'react';
import { useAuth } from '../store/AuthContext';
import { useToast } from '../store/ToastContext';

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

  const { login } = useAuth();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
          // Mock login
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
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>

        <h2>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Họ và tên</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>

        <p className="switch-auth">
          {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
          <button onClick={() => setIsLogin(!isLogin)} className="link-btn">
            {isLogin ? "Đăng ký" : "Đăng nhập"}
          </button>
        </p>

      </div>
    </div>
  );
};
