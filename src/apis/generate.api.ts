import { IEditApiReq, IGenerateApiReq, IGenerateApiRes } from '@src/types';
import { serverAxios } from '.';

export async function generateApi(
  generateApiReq: IGenerateApiReq
): Promise<IGenerateApiRes> {
  const { data } = await serverAxios.post<IGenerateApiRes>(
    '/ai',
    generateApiReq
  );

  return data;
}

export async function editApi(
  editApiReq: IEditApiReq
): Promise<IGenerateApiRes> {
  const { data } = await serverAxios.patch<IGenerateApiRes>('/ai', editApiReq);

  return data;
}
