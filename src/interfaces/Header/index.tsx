export interface Menu {
  id: string;
  itemName: string | any;
  isSeparator?: boolean;
  link?: string;
}

export interface DataUser {
  country: string;
  displayName: string;
  email: string;
  followers: number;
  id: string;
  photo: string;
  product: string;
  profileUrl: string;
}

export interface User {
  data: DataUser | undefined;
  isFetching: boolean;
}

export interface UserPayload {
  type: string;
  payload?: any;
}
