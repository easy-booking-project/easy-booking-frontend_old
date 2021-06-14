export async function signIn(username: string, authenticationHash: string): Promise<Response> {
  return fetch(
    process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/authentication/sign-in' : 'production url', // TODO production url
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        authenticationHash,
      }),
      credentials: 'same-origin',
    },
  );
}

export interface ISignUp {
  username: string;
  authenticationHash: string;
  nickname?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
}

export async function signUp(payload: ISignUp): Promise<Response> {
  return fetch(
    process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/authentication/sign-up' : 'production url', // TODO production url
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'same-origin',
    },
  );
}

export async function signOut(token: string): Promise<Response> {
  return fetch(
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3020/auth/logout'
      : 'https://nest-backend.azurewebsites.net/auth/logout', // TODO production url
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    },
  );
}
