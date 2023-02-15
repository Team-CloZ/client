import {
  ICheckNameApiRes,
  ISignInApiReq,
  ISignInApiRes,
  ISignUpApiReq,
  ISignUpApiRes,
} from '@src/types';
import { serverAxios } from '.';

export async function checkNameApi(name: string): Promise<ICheckNameApiRes> {
  const { data } = await serverAxios.get<ICheckNameApiRes>(`/auth/check-name`, {
    params: { name },
  });

  return data;
}

export async function signUpApi(
  signUpReq: ISignUpApiReq
): Promise<ISignUpApiRes> {
  const { data } = await serverAxios.post<ISignUpApiRes>(
    `/auth/sign-up`,
    signUpReq
  );

  return data;
}

export async function signInApi(
  signInReq: ISignInApiReq
): Promise<ISignInApiRes> {
  const { data } = await serverAxios.post<ISignInApiRes>(
    `/auth/sign-in`,
    signInReq
  );

  return data;
}
