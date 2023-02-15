export interface ICheckNameApiRes {
  readonly isExist: boolean;
}

export interface ISignUpApiReq {
  readonly name: string;
  readonly password: string;
}

export interface ISignUpApiRes {
  readonly id: number;
  readonly name: string;
}

export interface ISignInApiReq {
  readonly name: string;
  readonly password: string;
}

export interface ISignInApiRes {
  readonly id: number;
  readonly name: string;
  readonly image: string;
}

export interface ISignInFormValues {
  readonly name: string;
  readonly password: string;
}

export interface ISignUpFormValues {
  readonly name: string;
  readonly password: string;
  readonly passwordCheck: string;
}
