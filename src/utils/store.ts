import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { fetchUser } from './api_handlers';

interface Auth {
  username: string;
  authenticated: boolean;
}

export type AuthState = {
  auth: Auth;
  validate: () => Promise<Auth>;
  login: (username: string) => void;
  logout: () => void;
};

function useAuth(
  initialState: Auth = {
    username: '',
    authenticated: false,
  },
) {
  const [auth, setAuth] = useState(initialState);

  const validate = async (): Promise<Auth> => {
    try {
      const response = await fetchUser();
      if (response.ok) {
        const result = await response.json();

        login(result.nickname);

        return {
          username: result.nickname,
          authenticated: true,
        } as Auth;
      }

      logout();
    } catch (e) {
      logout();
    }

    return auth;
  };

  const login = (username: string) =>
    setAuth({
      username,
      authenticated: true,
    });

  const logout = () =>
    setAuth({
      username: '',
      authenticated: false,
    });

  return { auth, validate, login, logout } as AuthState;
}

const Auth = createContainer(useAuth);

export default Auth;
