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
  nowPlayingBar: {
    playerCurrentlyPlayed: {
      isFetching: boolean;
      data: any;
    };
    playerCurrentlyPlaying: {
      isFetching: boolean;
      data: any;
    };
    track: {
      isFetching: boolean;
      data: any;
    };
    play: {
      isFetching: boolean;
    };
  };
}
