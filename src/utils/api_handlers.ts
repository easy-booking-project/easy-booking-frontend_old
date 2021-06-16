/* eslint-disable import/prefer-default-export */

import ServerInfo from "./ServerInfo";
import { UserSignInInfo, UserSignUpInfo } from "./User";

export async function signIn({ username, authenticationHash }: UserSignInInfo) {
  return fetch(
    `${ServerInfo.BASE_URL}/authentication/sign-in`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        authenticationHash,
      }),
      credentials: 'include',
    },
  );
}

export async function signUp(payload: Partial<UserSignUpInfo>) {
  return fetch(
    `${ServerInfo.BASE_URL}/authentication/sign-up`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );
}

export async function fetchUser() {
  return fetch(
    `${ServerInfo.BASE_URL}/user/fetch`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function callApiAndReturnIfSucceed(apiCall: (...p: any) => Promise<Response>, ...params: any[]) {
  try {
    const response = await apiCall(...params);
    return response.ok;
  } catch {
    return false;
  }
}