import React from 'react';

const Message = ({ message, theme }) => {
  const isUser = message.type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-3xl px-4 py-3 rounded-lg ${
          isUser ? 'ml-12' : 'mr-12'
        }`}
        style={{
          backgroundColor: isUser
            ? theme.colors.buttonPrimary
            : theme.colors.buttonSecondary,
          color: isUser ? '#ffffff' : theme.colors.text,
        }}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        {message.askedAt && (
          <div
            className="text-xs mt-2"
            style={{ color: theme.colors.textMuted }}
          >
            回答时间: {new Date(message.askedAt).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
