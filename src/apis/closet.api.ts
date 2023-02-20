import { IGetLikesApiReq, IGetLikesApiRes } from '@src/types';
import { serverAxios } from '.';

export async function getLikesApi(
  getLikesReq: IGetLikesApiReq
): Promise<IGetLikesApiRes> {
  const { data } = await serverAxios.get<IGetLikesApiRes>(
    '/users/' + getLikesReq.userId + '/like'
  );

  return data;
}
