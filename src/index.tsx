import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { LocalStorages } from "@enums/localStorages";

serviceWorkerRegistration.register();

window.onSpotifyWebPlaybackSDKReady = () => {
  const user: string | any = localStorage.getItem(LocalStorages.User);
  const token = JSON.parse(user).token;

  const player = new window.Spotify.Player({
    name: "Loc Do Player",
    getOAuthToken: (callback: any) => {
      callback(token);
    },
    volume: 0.2,
  });
  player.connect().then((success: any) => {
    if (success) {
      console.log("The Web Playback SDK successfully connected to Spotify!");
    }
  });
  return player;
};

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: any;
    Spotify: any;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

