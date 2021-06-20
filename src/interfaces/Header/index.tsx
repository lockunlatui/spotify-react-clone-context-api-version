export interface IMenu {
  id: string;
  itemName: string | any;
  isSeparator?: boolean;
  link?: string;
}

export interface IDataUser {
  country: string;
  displayName: string;
  email: string;
  followers: number;
  id: string;
  photo: string;
  product: string;
  profileUrl: string;
}

export interface IUser {
  data: IDataUser | undefined;
  isFetching: boolean;
}

export interface IUserPayload {
  type: string;
  payload?: any;
}
