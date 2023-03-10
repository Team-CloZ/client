import { IEditApiReq, IGenerateApiReq, IGenerateApiRes } from '@src/types';
import { serverAxios } from '.';
import { CancelToken } from 'axios';

export async function generateApi(
  generateApiReq: IGenerateApiReq
  // cancelToken: CancelToken
): Promise<IGenerateApiRes> {
  const { data } = await serverAxios.post<IGenerateApiRes>(
    '/ai',
    generateApiReq
    // { cancelToken }
  );

  return data;
}

export async function editApi(
  editApiReq: IEditApiReq
  // cancelToken: CancelToken
): Promise<IGenerateApiRes> {
  const { data } = await serverAxios.patch<IGenerateApiRes>('/ai', editApiReq, {
    // cancelToken,
  });

  return data;
}

export async function getGenerateQueueApi(): Promise<number> {
  const { data } = await serverAxios.get<number>('/ai/queue/generate');

  return data;
}

export async function getEditQueueApi(): Promise<number> {
  const { data } = await serverAxios.get<number>('/ai/queue/edit');

  return data;
}
