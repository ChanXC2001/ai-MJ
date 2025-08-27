import React, { useState } from 'react';
import { Send, Plus, Mic } from 'lucide-react';

const ChatInput = ({ onSendMessage, isLoading, theme }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      className="flex-shrink-0 border-t p-4"
      style={{
        backgroundColor: theme.colors.main,
        borderTopColor: theme.colors.border,
      }}
    >
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div
            className="flex items-center rounded-full border transition-colors"
            style={{
              backgroundColor: theme.colors.chatInput,
              borderColor: theme.colors.border,
            }}
          >
            <button
              type="button"
              className="flex-shrink-0 p-3 transition-colors"
              style={{ color: theme.colors.textMuted }}
              title="添加附件"
            >
              <Plus size={20} />
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="询问任何问题"
              className="flex-1 bg-transparent px-4 py-3 focus:outline-none min-w-0"
              style={{
                color: theme.colors.text,
              }}
              disabled={isLoading}
            />

            <div className="flex items-center flex-shrink-0 pr-2">
              <button
                type="button"
                className="p-3 transition-colors"
                style={{ color: theme.colors.textMuted }}
                title="语音输入"
              >
                <Mic size={20} />
              </button>

              <button
                type="button"
                className="p-3 transition-colors"
                style={{ color: theme.colors.textMuted }}
                title="音频处理"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 18V5l7 7-7 6z" />
                  <path d="M2 5v14" />
                  <path d="M22 5v14" />
                  <path d="M5 9v6" />
                  <path d="M19 9v6" />
                </svg>
              </button>

              {input.trim() && (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="p-3 rounded-full transition-colors ml-1"
                  style={{
                    backgroundColor: theme.colors.buttonPrimary,
                    color: '#ffffff',
                  }}
                  title="发送消息"
                >
                  <Send size={16} />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
