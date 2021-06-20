export interface User {
  data: any;
  isFetching: boolean;
}

export interface IAppState {
  header: {
    user: User;
    language: string;
    token: string;
  };
}
