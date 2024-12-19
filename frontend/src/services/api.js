import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock Setup
if (import.meta.env.MODE === 'development') {
    console.log('Mocking API requests');
  const mock = new MockAdapter(API);

  // Mock /auth/signin endpoint
  mock.onPost('/auth/signin').reply((config) => {
    const { username, password } = JSON.parse(config.data);

    if (username === 'admin' && password === 'admin') {
      return [
        200,
        {
          id: 1,
          username: 'admin',
          email: 'admin@example.com',
          roles: ['ROLE_ADMIN'],
          accessToken: 'mocked-jwt-token',
        },
      ];
    } else {
      return [401, { message: 'Invalid username or password' }];
    }
  });
}

export const login = (data) => API.post('/auth/signin', data);

export default API;
