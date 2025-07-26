import axios, { endpoints } from 'src/utils/axios';

import { setSession } from './utils';
import { STORAGE_KEY } from './constant';

export const signInWithPassword = async ({ username, password }) => {
  try {
    const response = await axios.post(endpoints.auth.signIn, {
      username,
      password,
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Login failed');
    }

    const { token, admin, expiresIn } = response.data.data;

    if (!token) {
      throw new Error('No access token received from server');
    }

    if (!admin) {
      throw new Error('No user data received from server');
    }

    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminData', JSON.stringify(admin));
    setSession(token);

    return {
      success: true,
      accessToken: token,
      user: admin,
      expiresIn,
    };
  } catch (error) {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');

    if (error.response) {
      const message =
        error.response.data?.message || error.response.data?.error || 'Login failed';
      throw new Error(message);
    } else if (error.request) {
      throw new Error('Network error - please check your connection');
    } else {
      throw error;
    }
  }
};

export const signUp = async ({ email, password, firstName, lastName }) => {
  const res = await axios.post(endpoints.auth.signUp, {
    email,
    password,
    firstName,
    lastName,
  });

  const { accessToken } = res.data;

  if (!accessToken) {
    throw new Error('Access token not found in response');
  }

  sessionStorage.setItem(STORAGE_KEY, accessToken);
};

export const signOut = async () => {
  await setSession(null);
};
