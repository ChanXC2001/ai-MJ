import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import LoginModal from './components/LoginModal';
import { useChat } from './hooks/useChat';
import { useAuth } from './hooks/useAuth';
import { useChatSessions } from './hooks/useChatSessions';
import { useTheme } from './hooks/useTheme';

function App() {
  const {
    user,
    login,
    logout,
    register,
    isLoading: authLoading,
    error: authError,
    isAuthenticated,
  } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar_collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const pendingMessageRef = useRef(null);

  const {
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
  } = useChatSessions(user?.id);

  const {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    setSessionMessages,
  } = useChat(currentSessionId, addMessageToSession, updateSessionTitle);

  useEffect(() => {
    localStorage.setItem('sidebar_collapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('用户已退出登录，清空界面显示');
      clearDisplaySessions();
      clearMessages();
      pendingMessageRef.current = null;
    } else {
      console.log('用户已登录，会话数据将自动加载');
    }
  }, [isAuthenticated, clearDisplaySessions, clearMessages]);

  useEffect(() => {
    const currentSession = getCurrentSession();
    if (currentSession) {
      console.log(
        '切换到会话:',
        currentSession.id,
        '消息数量:',
        currentSession.messages.length
      );
      setSessionMessages(currentSession.messages);
    } else if (currentSessionId) {
      setSessionMessages([]);
    }
  }, [currentSessionId, sessions, getCurrentSession, setSessionMessages]);

  useEffect(() => {
    if (currentSessionId && pendingMessageRef.current) {
      console.log('会话创建完成，发送待发送的消息:', pendingMessageRef.current);
      const messageToSend = pendingMessageRef.current;
      pendingMessageRef.current = null;

      setTimeout(() => {
        sendMessage(messageToSend);
      }, 50);
    }
  }, [currentSessionId, sendMessage]);

  const handleSendMessage = useCallback(
    (message) => {
      if (!isAuthenticated) {
        setShowLoginModal(true);
        return;
      }

      console.log('处理发送消息:', message);
      console.log('当前会话ID:', currentSessionId);

      if (!currentSessionId) {
        console.log('没有当前会话，创建新会话...');
        pendingMessageRef.current = message;
        createNewSession();
      } else {
        sendMessage(message);
      }
    },
    [isAuthenticated, currentSessionId, createNewSession, sendMessage]
  );

  const handleNewChat = () => {
    const newSessionId = createNewSession();
    console.log('手动创建新会话:', newSessionId);
  };

  const handleSwitchSession = (sessionId) => {
    console.log('切换到会话:', sessionId);
    switchToSession(sessionId);
  };

  const handleDeleteSession = (sessionId) => {
    deleteSession(sessionId);
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const handleClearMessages = () => {
    clearCurrentSessionMessages();
    clearMessages();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className="h-screen flex overflow-hidden"
      style={{ backgroundColor: theme.colors.main }}
    >
      {isAuthenticated && (
        <Sidebar
          user={user}
          onLogout={handleLogout}
          sessions={sessions}
          currentSessionId={currentSessionId}
          onNewChat={handleNewChat}
          onSwitchSession={handleSwitchSession}
          onDeleteSession={handleDeleteSession}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
          theme={theme}
        />
      )}

      <div className="flex-1 flex flex-col min-h-0 min-w-0">
        <Header
          user={user}
          onLoginClick={() => setShowLoginModal(true)}
          onRegisterClick={() => setShowLoginModal(true)}
          showSidebar={isAuthenticated}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={handleToggleSidebar}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <div className="flex-1 min-h-0">
          <MessageList
            messages={messages}
            isLoading={isLoading}
            error={error}
            isAuthenticated={isAuthenticated}
            theme={theme}
          />
        </div>

        {isAuthenticated && (
          <>
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              theme={theme}
            />

            {/* {messages.length > 0 && (
              <button
                onClick={handleClearMessages}
                className="fixed bottom-24 right-8 p-3 rounded-full shadow-lg transition-colors z-10"
                style={{
                  backgroundColor: theme.colors.error,
                  color: '#ffffff',
                }}
                title="清空对话"
              >
                清空
              </button>
            )} */}
          </>
        )}
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={login}
        onRegister={register}
        isLoading={authLoading}
        error={authError}
        theme={theme}
      />
    </div>
  );
}

export default App;
