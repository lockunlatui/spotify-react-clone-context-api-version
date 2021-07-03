export interface User {
  data: any;
  isFetching: boolean;
}

export interface AppState {
  header: {
    user: User;
    language: string;
    token: string;
  };
}
