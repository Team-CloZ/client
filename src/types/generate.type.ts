export interface IStartFormValue {
  readonly title: string;
  readonly color: string;
  readonly desc: string;
}

export interface IGenerateApiReq {
  readonly title: string;
  readonly color: string;
  readonly desc: string;
}

export interface IGenerateApiRes {
  readonly images: string[];
}

export interface IEditApiReq {
  readonly image: string;
  readonly source: IGenerateApiReq;
  readonly target: IGenerateApiReq;
}
