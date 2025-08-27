import React from 'react';
import { Plus, Settings, Menu, Moon, Sun } from 'lucide-react';

const Header = ({
  user,
  onLoginClick,
  onRegisterClick,
  showSidebar = false,
  sidebarCollapsed = false,
  onToggleSidebar,
  theme,
  onToggleTheme,
}) => {
  return (
    <header
      className={`flex justify-between items-center px-6 py-4 ${
        showSidebar ? 'border-b' : ''
      }`}
      style={{
        backgroundColor: theme.colors.main,
        borderBottomColor: theme.colors.border,
      }}
    >
      <div className="flex items-center space-x-4">
        <h1
          className="text-xl font-medium"
          style={{ color: theme.colors.text }}
        >
          金得瑞AI
        </h1>
      </div>

      {!user ? (
        <div className="flex items-center space-x-3">
          {/* 主题切换按钮 */}
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors"
            style={{
              color: theme.colors.text,
              borderColor: theme.colors.border,
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = theme.colors.borderLight;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = theme.colors.border;
            }}
            title={theme.isDark ? '切换到浅色主题' : '切换到深色主题'}
          >
            {theme.isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={onLoginClick}
            className="px-4 py-2 rounded-lg border transition-colors"
            style={{
              color: theme.colors.text,
              borderColor: theme.colors.border,
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = theme.colors.borderLight;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = theme.colors.border;
            }}
          >
            登录
          </button>
          <button
            onClick={onRegisterClick}
            className="px-4 py-2 rounded-lg transition-colors font-medium"
            style={{
              backgroundColor: theme.isDark ? '#ffffff' : '#000000',
              color: theme.isDark ? '#000000' : '#ffffff',
            }}
          >
            免费注册
          </button>
          <button
            className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors"
            style={{
              color: theme.colors.text,
              borderColor: theme.colors.border,
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = theme.colors.borderLight;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = theme.colors.border;
            }}
          >
            <span className="text-sm">?</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          {/* 主题切换按钮 */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg transition-colors"
            style={{
              color: theme.colors.textMuted,
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.colors.hover;
              e.target.style.color = theme.colors.text;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = theme.colors.textMuted;
            }}
            title={theme.isDark ? '切换到浅色主题' : '切换到深色主题'}
          >
            {theme.isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
