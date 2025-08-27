import { useState, useCallback, useEffect } from 'react';

const THEME_STORAGE_KEY = 'app_theme';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved ? JSON.parse(saved) : true; // 默认为深色主题
  });

  // 保存主题设置到本地存储
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDark));
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const theme = {
    isDark,
    colors: {
      // 基础颜色
      text: isDark ? '#ffffff' : '#000000',
      textSecondary: isDark ? '#ffffff' : '#000000',
      textMuted: isDark ? '#ffffff' : '#000000',

      // 背景颜色
      sidebar: isDark ? '#181818' : '#f9f9f9',
      main: isDark ? '#212121' : '#ffffff',
      chatInput: isDark ? '#303030' : '#ffffff',

      // 边框颜色
      border: isDark ? '#374151' : '#e5e7eb',
      borderLight: isDark ? '#4b5563' : '#d1d5db',

      // 按钮和交互元素
      buttonPrimary: isDark ? '#3b82f6' : '#2563eb',
      buttonSecondary: isDark ? '#374151' : '#f3f4f6',
      hover: isDark ? '#374151' : '#f9fafb',

      // 状态颜色
      success: isDark ? '#10b981' : '#059669',
      error: isDark ? '#ef4444' : '#dc2626',
      warning: isDark ? '#f59e0b' : '#d97706',
    },
  };

  return {
    isDark,
    theme,
    toggleTheme,
  };
};
