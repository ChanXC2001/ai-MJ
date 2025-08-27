import React, { useEffect, useRef } from 'react';
import Message from './Message';
import { Paperclip, Search, BookOpen, Mic } from 'lucide-react';

const MessageList = ({
  messages,
  isLoading,
  error,
  isAuthenticated,
  theme,
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0 && !error) {
    if (isAuthenticated) {
      return (
        <div
          className="h-full flex items-center justify-center"
          style={{ backgroundColor: theme.colors.main }}
        >
          <div className="text-center">
            <h1
              className="text-2xl font-light mb-4"
              style={{ color: theme.colors.text }}
            >
              在时刻准备着。
            </h1>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="h-full flex flex-col items-center justify-center px-4"
          style={{ backgroundColor: theme.colors.main }}
        >
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
            <h1
              className="text-5xl font-light mb-16 tracking-wide"
              style={{ color: theme.colors.text }}
            >
              金得瑞AI
            </h1>

            <div className="w-full max-w-4xl mb-32">
              <div className="relative">
                <input
                  type="text"
                  placeholder="询问任何问题"
                  className="w-full border rounded-3xl px-6 py-4 text-base focus:outline-none transition-colors pl-32 pr-16"
                  style={{
                    backgroundColor: theme.colors.chatInput,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  }}
                  disabled
                />

                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <button
                    className="p-2 rounded-lg transition-colors"
                    style={{ color: theme.colors.textMuted }}
                  >
                    <Paperclip size={18} />
                  </button>
                  <button
                    className="p-2 rounded-lg transition-colors"
                    style={{ color: theme.colors.textMuted }}
                  >
                    <Search size={18} />
                  </button>
                  <button
                    className="p-2 rounded-lg transition-colors"
                    style={{ color: theme.colors.textMuted }}
                  >
                    <BookOpen size={18} />
                  </button>
                </div>

                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <button
                    className="p-2 rounded-lg transition-colors"
                    style={{ color: theme.colors.textMuted }}
                  >
                    <Mic size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
              <p
                className="text-sm text-center max-w-2xl leading-relaxed"
                style={{ color: theme.colors.textMuted }}
              >
                向 ChatGPT
                发送消息即表示，您同意我们的条款并已阅读我们的隐私政策。
              </p>
            </div> */}
          </div>
        </div>
      );
    }
  }

  return (
    <div
      className="h-full flex flex-col"
      style={{ backgroundColor: theme.colors.main }}
    >
      {error && (
        <div className="flex-shrink-0 p-4">
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: theme.colors.error,
              color: '#ffffff',
            }}
          >
            {error}
          </div>
        </div>
      )}

      <div
        className={`flex-1 overflow-y-auto ${
          theme.isDark ? 'chat-scrollbar-dark' : 'chat-scrollbar-light'
        }`}
      >
        <div className="px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <Message key={message.id} message={message} theme={theme} />
            ))}

            {isLoading && (
              <div className="flex justify-start mb-4">
                <div
                  className="px-4 py-3 rounded-lg mr-12"
                  style={{
                    backgroundColor: theme.colors.buttonSecondary,
                    color: theme.colors.text,
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="animate-pulse">正在思考中...</div>
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{ backgroundColor: theme.colors.textMuted }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          backgroundColor: theme.colors.textMuted,
                          animationDelay: '0.1s',
                        }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          backgroundColor: theme.colors.textMuted,
                          animationDelay: '0.2s',
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageList;
