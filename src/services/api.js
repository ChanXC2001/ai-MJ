import axios from 'axios';

// const API_BASE_URL = 'http://192.168.2.63:8000';
const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export const askQuestion = async (question) => {
  try {
    const requestData = {
      question: question.trim(),
    };

    console.log('发送请求到:', `${API_BASE_URL}/ask`);
    console.log('请求数据:', requestData);

    const response = await axios.post(`${API_BASE_URL}/ask`, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 300000,
    });

    console.log('响应状态:', response.status);
    console.log('响应数据:', response.data);

    // 验证响应数据格式
    if (
      response.data &&
      response.data.answer &&
      response.data.question &&
      response.data.asked_at
    ) {
      return {
        success: true,
        data: {
          question: response.data.question,
          answer: response.data.answer,
          asked_at: response.data.asked_at,
        },
      };
    } else {
      console.error('响应数据格式不正确:', response.data);
      return {
        success: false,
        error: '服务器响应格式错误',
      };
    }
  } catch (error) {
    console.error('API请求失败:', error);

    if (error.response) {
      console.error('错误响应状态:', error.response.status);
      console.error('错误响应数据:', error.response.data);
      return {
        success: false,
        error: `服务器错误: ${error.response.status} - ${
          error.response.data?.message || '未知错误'
        }`,
      };
    } else if (error.request) {
      console.error('请求未得到响应:', error.request);
      return {
        success: false,
        error: '无法连接到服务器，请检查网络连接和服务器状态',
      };
    } else {
      console.error('请求配置错误:', error.message);
      return {
        success: false,
        error: '请求配置错误，请联系技术支持',
      };
    }
  }
};

export default apiClient;
