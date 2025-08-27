import { useState, useCallback, useEffect } from 'react';

const SESSIONS_STORAGE_PREFIX = 'chat_sessions_user_';
const CURRENT_SESSION_STORAGE_PREFIX = 'current_session_id_user_';

export const useChatSessions = (userId) => {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  // 获取当前用户的存储键
  const getStorageKeys = useCallback(() => {
    return {
      sessionsKey: userId ? `${SESSIONS_STORAGE_PREFIX}${userId}` : null,
      currentSessionKey: userId
        ? `${CURRENT_SESSION_STORAGE_PREFIX}${userId}`
        : null,
    };
  }, [userId]);

  // 从本地存储加载当前用户的数据
  useEffect(() => {
    if (!userId) {
      // 没有用户ID时清空状态
      setSessions([]);
      setCurrentSessionId(null);
      return;
    }

    const { sessionsKey, currentSessionKey } = getStorageKeys();

    if (sessionsKey) {
      const savedSessions = localStorage.getItem(sessionsKey);
      if (savedSessions) {
        try {
          const parsedSessions = JSON.parse(savedSessions);
          setSessions(parsedSessions);
          console.log(
            '加载用户',
            userId,
            '的聊天记录:',
            parsedSessions.length,
            '个会话'
          );
        } catch (error) {
          console.error('解析用户聊天记录失败:', error);
          localStorage.removeItem(sessionsKey);
        }
      }
    }

    if (currentSessionKey) {
      const savedCurrentSessionId = localStorage.getItem(currentSessionKey);
      if (savedCurrentSessionId) {
        setCurrentSessionId(savedCurrentSessionId);
        console.log('恢复用户', userId, '的当前会话ID:', savedCurrentSessionId);
      }
    }
  }, [userId, getStorageKeys]);

  // 保存会话到本地存储
  const saveSessionsToStorage = useCallback(
    (newSessions) => {
      if (!userId) return;

      const { sessionsKey } = getStorageKeys();
      if (sessionsKey) {
        try {
          localStorage.setItem(sessionsKey, JSON.stringify(newSessions));
          console.log('用户', userId, '的会话已保存到本地存储');
        } catch (error) {
          console.error('保存聊天记录失败:', error);
        }
      }
    },
    [userId, getStorageKeys]
  );

  // 保存当前会话ID到本地存储
  const saveCurrentSessionId = useCallback(
    (sessionId) => {
      if (!userId) return;

      const { currentSessionKey } = getStorageKeys();
      if (currentSessionKey) {
        try {
          if (sessionId) {
            localStorage.setItem(currentSessionKey, sessionId);
            console.log('用户', userId, '的当前会话ID已保存:', sessionId);
          } else {
            localStorage.removeItem(currentSessionKey);
            console.log('清除用户', userId, '的当前会话ID');
          }
        } catch (error) {
          console.error('保存当前会话ID失败:', error);
        }
      }
    },
    [userId, getStorageKeys]
  );

  // 创建新的聊天会话
  const createNewSession = useCallback(() => {
    if (!userId) return null;

    const newSession = {
      id: Date.now().toString(),
      title: '新聊天',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log('为用户', userId, '创建新会话:', newSession.id);

    setSessions((prev) => {
      const updatedSessions = [newSession, ...prev];
      saveSessionsToStorage(updatedSessions);
      return updatedSessions;
    });

    setCurrentSessionId(newSession.id);
    saveCurrentSessionId(newSession.id);

    return newSession.id;
  }, [userId, saveSessionsToStorage, saveCurrentSessionId]);

  // 更新会话标题
  const updateSessionTitle = useCallback(
    (sessionId, title) => {
      if (!userId) return;

      console.log('更新用户', userId, '的会话标题:', sessionId, title);
      setSessions((prev) => {
        const updatedSessions = prev.map((session) =>
          session.id === sessionId
            ? {
                ...session,
                title: title.slice(0, 30) + (title.length > 30 ? '...' : ''),
                updatedAt: new Date().toISOString(),
              }
            : session
        );
        saveSessionsToStorage(updatedSessions);
        return updatedSessions;
      });
    },
    [userId, saveSessionsToStorage]
  );

  // 添加消息到指定会话
  const addMessageToSession = useCallback(
    (sessionId, message) => {
      if (!userId) return;

      console.log('为用户', userId, '添加消息到会话:', sessionId, message.type);
      setSessions((prev) => {
        const updatedSessions = prev.map((session) =>
          session.id === sessionId
            ? {
                ...session,
                messages: [...session.messages, message],
                updatedAt: new Date().toISOString(),
              }
            : session
        );
        saveSessionsToStorage(updatedSessions);
        return updatedSessions;
      });
    },
    [userId, saveSessionsToStorage]
  );

  // 切换当前会话
  const switchToSession = useCallback(
    (sessionId) => {
      if (!userId) return;

      console.log('用户', userId, '切换会话:', sessionId);
      setCurrentSessionId(sessionId);
      saveCurrentSessionId(sessionId);
    },
    [userId, saveCurrentSessionId]
  );

  // 删除会话
  const deleteSession = useCallback(
    (sessionId) => {
      if (!userId) return;

      console.log('删除用户', userId, '的会话:', sessionId);
      setSessions((prev) => {
        const updatedSessions = prev.filter(
          (session) => session.id !== sessionId
        );
        saveSessionsToStorage(updatedSessions);
        return updatedSessions;
      });

      if (currentSessionId === sessionId) {
        setCurrentSessionId(null);
        saveCurrentSessionId(null);
      }
    },
    [userId, currentSessionId, saveSessionsToStorage, saveCurrentSessionId]
  );

  // 获取当前会话
  const getCurrentSession = useCallback(() => {
    return sessions.find((session) => session.id === currentSessionId);
  }, [sessions, currentSessionId]);

  // 清空当前会话消息
  const clearCurrentSessionMessages = useCallback(() => {
    if (!userId || !currentSessionId) return;

    console.log('清空用户', userId, '的当前会话消息:', currentSessionId);
    setSessions((prev) => {
      const updatedSessions = prev.map((session) =>
        session.id === currentSessionId ? { ...session, messages: [] } : session
      );
      saveSessionsToStorage(updatedSessions);
      return updatedSessions;
    });
  }, [userId, currentSessionId, saveSessionsToStorage]);

  // 清空界面显示的会话数据（退出登录时调用，不删除存储的数据）
  const clearDisplaySessions = useCallback(() => {
    console.log('清空界面显示的会话数据');
    setSessions([]);
    setCurrentSessionId(null);
  }, []);

  return {
    sessions,
    currentSessionId,
    createNewSession,
    updateSessionTitle,
    addMessageToSession,
    switchToSession,
    deleteSession,
    getCurrentSession,
    clearCurrentSessionMessages,
    clearDisplaySessions,
  };
};
