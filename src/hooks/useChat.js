import { useState, useCallback } from 'react';
import { askQuestion } from '../services/api';

export const useChat = (sessionId, onAddMessage, onUpdateTitle) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 设置消息（用于切换会话时）
  const setSessionMessages = useCallback((sessionMessages) => {
    setMessages(sessionMessages || []);
  }, []);

  const sendMessage = useCallback(
    async (question) => {
      if (!question.trim()) return;

      // 检查是否有有效的会话ID
      if (!sessionId) {
        console.error('sendMessage: 没有有效的会话ID, sessionId:', sessionId);
        setError('会话创建失败，请重试');
        return;
      }

      console.log('开始发送消息:', question, '会话ID:', sessionId);

      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: question,
        timestamp: new Date().toISOString(),
      };

      // 立即更新本地消息状态
      setMessages((prev) => {
        const newMessages = [...prev, userMessage];
        console.log('更新本地消息状态，当前消息数:', newMessages.length);

        // 如果这是第一条消息，更新会话标题
        if (prev.length === 0) {
          console.log('更新会话标题:', question);
          onUpdateTitle(sessionId, question);
        }

        return newMessages;
      });

      // 添加消息到会话存储
      onAddMessage(sessionId, userMessage);

      setIsLoading(true);
      setError(null);

      try {
        console.log('发送API请求:', question);
        const result = await askQuestion(question);
        console.log('API请求结果:', result);

        if (result.success) {
          const assistantMessage = {
            id: Date.now() + 1,
            type: 'assistant',
            content: result.data.answer,
            question: result.data.question,
            askedAt: result.data.asked_at,
            timestamp: new Date().toISOString(),
          };

          console.log('添加AI回复消息');

          // 更新本地消息状态
          setMessages((prev) => {
            const newMessages = [...prev, assistantMessage];
            console.log('更新后的消息列表长度:', newMessages.length);
            return newMessages;
          });

          // 添加到会话存储
          onAddMessage(sessionId, assistantMessage);
        } else {
          console.error('API调用失败:', result.error);
          setError(result.error);
        }
      } catch (err) {
        console.error('发送消息时出现错误:', err);
        setError('发送消息时出现错误，请重试');
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, onAddMessage, onUpdateTitle]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    setSessionMessages,
  };
};
