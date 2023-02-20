import { User } from 'next-auth';
import { SortType } from '.';

export interface IClothesPreview {
  readonly id: number;
  readonly imageUrl: string;
  readonly title: string;
  readonly color: string;
  readonly desc: string;
  readonly caption?: string;
}

export interface IClothesDetail {
  readonly id: number;
  readonly imageUrl: string;
  readonly title: string;
  readonly color: string;
  readonly desc: string;
  readonly caption?: string;
  readonly likeCount: number;
  readonly userId: number;
  readonly parentId?: number;
  readonly user?: User;
  readonly parent?: IClothesDetail;
}

export interface IGetClothesApiReq {
  readonly page: number;
  readonly search?: string;
  readonly userId?: number;
  readonly sortType: SortType;
}

export interface IGetClothesDetailApiReq {
  readonly id: number;
}

export interface IGetIsLikedApiReq {
  readonly id: number;
  readonly userId: number;
}

export interface IPostLikeApiReq {
  readonly id: number;
  readonly userId: number;
}

export interface IGetChildrenApiReq {
  readonly id: number;
}

export interface IPostPostApiReq {
  readonly title: string;
  readonly color: string;
  readonly desc: string;
  readonly caption?: string;
  readonly userId: number;
  readonly parentId?: number;
  readonly imageUrl: string;
}

export interface IPostPostApiRes {
  readonly id: number;
}
