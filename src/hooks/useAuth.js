import { useState, useCallback, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 检查本地存储的登录状态
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        console.log('恢复用户登录状态:', userData.username);
      } catch (err) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  // 模拟登录接口
  const login = useCallback(async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (username.trim() && password.trim()) {
        if (password.length < 3) {
          throw new Error('密码长度至少3位');
        }

        const userData = {
          id: `user_${username.trim()}`, // 使用用户名作为唯一ID
          username: username.trim(),
          name: username.trim(),
          avatar: null,
          loginTime: new Date().toISOString(),
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('用户登录成功:', userData.username);

        return { success: true, user: userData };
      } else {
        throw new Error('用户名和密码不能为空');
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 登出功能
  const logout = useCallback(() => {
    console.log('用户退出登录:', user?.username);
    setUser(null);
    localStorage.removeItem('user');
  }, [user]);

  // 模拟注册接口
  const register = useCallback(async (username, password, confirmPassword) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!username.trim()) {
        throw new Error('用户名不能为空');
      }

      if (username.trim().length < 3) {
        throw new Error('用户名长度至少3位');
      }

      if (password !== confirmPassword) {
        throw new Error('密码确认不匹配');
      }

      if (password.length < 6) {
        throw new Error('密码长度至少6位');
      }

      const userData = {
        id: `user_${username.trim()}`, // 使用用户名作为唯一ID
        username: username.trim(),
        name: username.trim(),
        avatar: null,
        registerTime: new Date().toISOString(),
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('用户注册成功:', userData.username);

      return { success: true, user: userData };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };
};
