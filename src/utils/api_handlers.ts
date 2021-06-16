/* eslint-disable import/prefer-default-export */

import ServerInfo from "./ServerInfo";
import { UserSignUpInfo } from "./User";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function callApiAndReturnIfSucceed(apiCall: (...p: any) => Promise<Response>, ...params: any[]) {
  try {
    const response = await apiCall(...params);
    return response.ok;
  } catch {
    return false;
  }
}