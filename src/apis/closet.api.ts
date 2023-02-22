import { IGetLikesApiReq, IGetLikesApiRes } from '@src/types';
import { serverAxios } from '.';
import { User } from 'next-auth';

export async function getLikesApi(
  getLikesReq: IGetLikesApiReq
): Promise<IGetLikesApiRes> {
  const { data } = await serverAxios.get<IGetLikesApiRes>(
    '/users/' + getLikesReq.userId + '/like'
  );

  return data;
}

export async function getUserApi(id: number): Promise<User> {
  const { data } = await serverAxios.get('/users/' + id);

  return data;
}
