import {
  IClothesDetail,
  IClothesPreview,
  IGetChildrenApiReq,
  IGetClothesApiReq,
  IGetClothesDetailApiReq,
  IGetIsLikedApiReq,
  IPostLikeApiReq,
  IPostPostApiReq,
  IPostPostApiRes,
  SortType,
} from '@src/types';
import { serverAxios } from '.';

export async function getClothesApi(
  getClothesReq: IGetClothesApiReq
): Promise<IClothesPreview[]> {
  const { data } = await serverAxios.get<IClothesPreview[]>('/posts', {
    params: {
      page: getClothesReq.page,
      userId: getClothesReq.userId,
      search: getClothesReq.search,
      sortBy: getClothesReq.sortType === SortType.LATEST ? 'latest' : 'popular',
    },
  });

  return data;
}

export async function getClothesDetailApi(
  getClothesDetailApiReq: IGetClothesDetailApiReq
): Promise<IClothesDetail> {
  const { data } = await serverAxios.get<IClothesDetail>(
    `/posts/${getClothesDetailApiReq.id}`
  );

  return data;
}

export async function getIsLikedApi(getIsLikedApi: IGetIsLikedApiReq) {
  const { data } = await serverAxios.get(`/posts/${getIsLikedApi.id}/like`, {
    params: {
      userId: getIsLikedApi.userId,
    },
  });

  return data;
}

export async function postLikeApi(postLikeApiReq: IPostLikeApiReq) {
  const { data } = await serverAxios.post(`/posts/${postLikeApiReq.id}/like`, {
    userId: postLikeApiReq.userId,
  });

  return data;
}

export async function getChildrenApi(
  getChildrenApiReq: IGetChildrenApiReq
): Promise<IClothesPreview[]> {
  const { data } = await serverAxios.get<IClothesPreview[]>(
    `/posts/${getChildrenApiReq.id}/children`
  );

  return data;
}

export async function postClothesApi(
  postPostApiReq: IPostPostApiReq
): Promise<IPostPostApiRes> {
  const { data } = await serverAxios.post<IPostPostApiRes>(
    '/posts',
    postPostApiReq
  );

  return data;
}
