import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

const LoginModal = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  isLoading,
  error,
  theme,
}) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      const result = await onLogin(formData.username, formData.password);
      if (result.success) {
        onClose();
        setFormData({ username: '', password: '', confirmPassword: '' });
      }
    } else {
      const result = await onRegister(
        formData.username,
        formData.password,
        formData.confirmPassword
      );
      if (result.success) {
        onClose();
        setFormData({ username: '', password: '', confirmPassword: '' });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="rounded-2xl w-full max-w-md shadow-2xl"
        style={{ backgroundColor: theme.colors.main }}
      >
        <div className="flex justify-between items-center p-8 pb-6">
          <h2
            className="text-2xl font-semibold"
            style={{ color: theme.colors.text }}
          >
            登录
          </h2>
          <button
            onClick={onClose}
            className="p-1"
            style={{ color: theme.colors.textMuted }}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-8 pb-8">
          {error && (
            <div
              className="mb-6 p-4 border rounded-lg text-sm"
              style={{
                backgroundColor: `${theme.colors.error}20`,
                borderColor: theme.colors.error,
                color: theme.colors.error,
              }}
            >
              {error}
            </div>
          )}

          <div className="mb-6">
            <label
              className="block text-base font-medium mb-3"
              style={{ color: theme.colors.text }}
            >
              用户名
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              autoComplete="username"
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-base"
              style={{
                borderColor: theme.colors.buttonPrimary,
                backgroundColor: theme.colors.main,
                color: theme.colors.text,
              }}
              placeholder=""
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-base font-medium mb-3"
              style={{ color: theme.colors.text }}
            >
              密码
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                autoComplete={isLoginMode ? 'current-password' : 'new-password'}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none text-base pr-12"
                style={{
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.main,
                  color: theme.colors.text,
                }}
                placeholder="请输入密码"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                style={{ color: theme.colors.textMuted }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {!isLoginMode && (
            <div className="mb-6">
              <label
                className="block text-base font-medium mb-3"
                style={{ color: theme.colors.text }}
              >
                确认密码
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                autoComplete="new-password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none text-base"
                style={{
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.main,
                  color: theme.colors.text,
                }}
                placeholder="请再次输入密码"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-4 rounded-xl font-medium text-base transition-colors disabled:opacity-50"
            style={{
              backgroundColor: theme.colors.buttonPrimary,
              color: '#ffffff',
            }}
          >
            {isLoading ? '处理中...' : '登录'}
          </button>

          <div className="mt-6 text-center">
            <span
              className="text-base"
              style={{ color: theme.colors.textSecondary }}
            >
              {isLoginMode ? '还没有账户？' : '已有账户？'}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setFormData({
                  username: '',
                  password: '',
                  confirmPassword: '',
                });
              }}
              className="ml-2 font-medium text-base hover:underline"
              style={{ color: theme.colors.buttonPrimary }}
            >
              {isLoginMode ? '立即注册' : '立即登录'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
