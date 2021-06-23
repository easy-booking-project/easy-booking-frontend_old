import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { fetchUser } from './api_handlers';

interface Auth {
  username: string;
  authenticated: boolean;
}

export type AuthState = {
  auth: Auth;
  validate: () => Promise<boolean>;
  login: () => void;
  logout: () => void;
};

function useAuth(
  initialState: Auth = {
    username: '',
    authenticated: false,
  },
) {
  const [auth, setAuth] = useState(initialState);

  const validate = async (): Promise<boolean> => {
    try {
      const response = await fetchUser();
      if (response.ok) {
        const result = await response.json();
        login(result.nickname);
      } else {
        logout();
      }
    } catch (e) {
      logout();
    }

    return auth.authenticated;
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
