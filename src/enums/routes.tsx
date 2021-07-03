export enum Apis {
  ApiV1 = "/api/v1",
}

export enum Routes {
  HomePage = "/",
  HomePageHasAuthenticate = "/home",
  Open = "/open",
  Search = "/search",
  YourLibrary = "/your-library",
  PlayList = '/playlist',
  LikedSong = '/liked-song'
}

export enum ApiRoutes {
  Logout = Apis.ApiV1 + "/logout",
}
