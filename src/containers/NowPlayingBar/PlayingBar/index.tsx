import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faImage } from "@fortawesome/free-regular-svg-icons";
import {
  faRandom,
  faStepBackward,
  faStepForward,
  faPlayCircle,
  faRedo,
  faPauseCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@components/index";
import c from "classnames";

/** Store */
import { StoreContext } from "@store/store-context";

/** Actions */
import { getPlayerCurrentlyPlaying } from "@store/actions/nowPlayingBar";

/** Styles */
import Styles from "./playingBar.module.scss";
import { useContext, useEffect, useState } from "react";
import axios from "@services/interceptor";
import { Colors } from "@enums/colors";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: any;
    Spotify: any;
  }
}

let timeInterval: any;

window.onSpotifyWebPlaybackSDKReady = () => {
  const user: any = localStorage.getItem("user");
  const token = JSON.parse(user).token;

  const player = new window.Spotify.Player({
    name: "Loc Do Player",
    getOAuthToken: (callback: any) => {
      callback(token);
    },
    volume: 0.5,
  });
  return player;
};

const PlayingBar = ({ playingMusicData, isPlaying }: any) => {
  const [state, dispatch] = useContext(StoreContext);
  const { playerCurrentlyPlaying } = state.nowPlayingBar;
  const [currentTime, setCurrentTime] = useState("0:00");
  const [percentTime, setPercentTime] = useState(0);

  const track = isPlaying
    ? {
        image: playingMusicData?.data?.album?.images[0].url,
        trackName: playingMusicData?.data?.name,
        artistName: playingMusicData?.data?.artists[0]?.name,
        durationTime: playingMusicData?.data?.duration_ms,
        uri: playingMusicData?.data?.album?.uri,
      }
    : {
        image: playingMusicData?.data?.items[0]?.track?.album?.images[0].url,
        trackName: playingMusicData?.data?.items[0]?.track?.name,
        artistName: playingMusicData?.data?.items[0]?.track?.artists[0]?.name,
        durationTime: playingMusicData?.data?.items[0]?.track?.duration_ms,
        uri: playingMusicData?.data?.items[0]?.track?.uri,
        position: playingMusicData?.data?.items[0]?.track?.track_number,
      };

  useEffect(() => {
    if (Boolean(playerCurrentlyPlaying?.data?.is_playing)) {
      console.log("true");
      let countTime = playerCurrentlyPlaying?.data?.progress_ms;

      timeInterval = setInterval(() => {
        console.log(
          "================",
          countTime <= playerCurrentlyPlaying?.data?.progress_ms
        );
        if (countTime <= playerCurrentlyPlaying?.data?.item?.duration_ms) {
          countTime += 1000;
          setPercentTime(
            (countTime / playerCurrentlyPlaying?.data?.item?.duration_ms) * 100
          );
          setCurrentTime(getDurationTime(countTime));
        } else {
          getPlayerCurrentlyPlaying(dispatch);
          setPercentTime(0);
          setCurrentTime(getDurationTime(0));
          clearInterval(timeInterval);
        }
      }, 1000);
    } else {
      setPercentTime(0);
      setCurrentTime(getDurationTime(0));
      clearInterval(timeInterval);
    }
    return () => {
      clearInterval(timeInterval);
    };
  }, [dispatch, playerCurrentlyPlaying]);

  const getDurationTime = (duration: number) => {
    const minutes = Math.floor(duration / 60000);
    const seconds: any = ((duration % 60000) / 1000).toFixed(0);
    return `${minutes}: ${seconds < 10 ? "0" : ""} ${seconds}`;
  };

  const play = () => {
    const player: any = window.onSpotifyWebPlaybackSDKReady();
    player.addListener("ready", ({ device_id }: any) => {
      localStorage.setItem("device_id", device_id);
      axios
        .put(`/me/player/play/${device_id}`, {
          spotifyUri: track.uri,
          position: track.position,
        })
        .then((response) => {
          console.log("response", response);
          if (response?.data?.status === 204) {
            getPlayerCurrentlyPlaying(dispatch);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
    player.connect().then((success: any) => {
      if (success) {
        console.log("The Web Playback SDK successfully connected to Spotify!");
      }
    });
    player.connect();
  };

  const pause = () => {
    const player: any = window.onSpotifyWebPlaybackSDKReady();
    player.pause().then(() => {
      const device_id = localStorage.getItem("device_id");
      axios
        .put(`/me/player/pause/${device_id}`)
        .then((response) => {
          getPlayerCurrentlyPlaying(dispatch);
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
  };

  return (
    <div className={Styles.nowPlayingBarContainer}>
      <div>
        <div className={Styles.left}>
          <img src={track?.image} alt={track?.trackName} />
          <div className={Styles.track}>
            <Typography className={Styles.nameTrack} variant="body2">
              {track?.trackName}
            </Typography>
            <Typography className={Styles.artistTrack} variant="caption">
              {track?.artistName}
            </Typography>
          </div>
          <div className={Styles.utils}>
            <FontAwesomeIcon icon={faHeart} />
            <FontAwesomeIcon icon={faImage} />
          </div>
        </div>
        <div className={Styles.middle}>
          <div className={Styles.controls}>
            <FontAwesomeIcon icon={faRandom} />
            <FontAwesomeIcon icon={faStepBackward} />
            {Boolean(playerCurrentlyPlaying?.data?.is_playing) ? (
              <FontAwesomeIcon onClick={() => pause()} icon={faPauseCircle} />
            ) : (
              <FontAwesomeIcon onClick={() => play()} icon={faPlayCircle} />
            )}
            <FontAwesomeIcon icon={faStepForward} />
            <FontAwesomeIcon icon={faRedo} />
          </div>
          <div className={Styles.playBar}>
            <Typography className={Styles.durationTime} variant="caption">
              {currentTime}
            </Typography>

            <div
              style={{ position: "relative" }}
              className={Styles.progressBar}
            >
              <div
                style={{
                  width: `${percentTime}%`,
                  backgroundColor: Colors.Green,
                  position: "absolute",
                  height: 6,
                  left: 0,
                  padding: 0,
                  borderRadius: 5,
                }}
              ></div>
            </div>
            <Typography className={Styles.durationTime} variant="caption">
              {getDurationTime(track?.durationTime)}
            </Typography>
          </div>
        </div>
        <div className={Styles.right}>
          <button
            className={c(Styles.iconLyrics, Styles.btnIcon)}
            aria-label="Lyrics"
            title="Lyrics"
          >
            <svg role="img" height="16" width="16" viewBox="0 0 16 16">
              <path d="M8.5 1A4.505 4.505 0 004 5.5c0 .731.191 1.411.502 2.022L1.99 13.163a1.307 1.307 0 00.541 1.666l.605.349a1.307 1.307 0 001.649-.283L9.009 9.95C11.248 9.692 13 7.807 13 5.5 13 3.019 10.981 1 8.5 1zM4.023 14.245a.307.307 0 01-.388.066l-.605-.349a.309.309 0 01-.128-.393l2.26-5.078A4.476 4.476 0 007.715 9.92l-3.692 4.325zM8.5 9C6.57 9 5 7.43 5 5.5S6.57 2 8.5 2 12 3.57 12 5.5 10.429 9 8.5 9z"></path>
            </svg>
          </button>
          <button
            className={`${c(
              Styles.iconQueue,
              Styles.btnIcon
            )} spoticon-queue-16`}
            aria-label="Queue"
            title="Queue"
          ></button>
          <button
            className={`${c(
              Styles.iconDevices,
              Styles.btnIcon
            )} spoticon-devices-16`}
            aria-label="Connect to a device"
            title="Connect to a device"
          ></button>
          <div className={Styles.volumeContainer}>
            <button
              className={Styles.volumeBarIcon}
              aria-label="Mute"
              aria-describedby="volume-icon"
              title="Mute"
            >
              <svg
                role="presentation"
                height="16"
                width="16"
                aria-label="Volume high"
                id="volume-icon"
                viewBox="0 0 16 16"
              >
                <path d="M12.945 1.379l-.652.763c1.577 1.462 2.57 3.544 2.57 5.858s-.994 4.396-2.57 5.858l.651.763a8.966 8.966 0 00.001-13.242zm-2.272 2.66l-.651.763a4.484 4.484 0 01-.001 6.397l.651.763c1.04-1 1.691-2.404 1.691-3.961s-.65-2.962-1.69-3.962zM0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732z"></path>
              </svg>
            </button>
            <div className={Styles.progressBarContainerVolume}>
              <div className={Styles.progressBarVolume}></div>
            </div>
          </div>
          <button aria-label="Full screen" title="Full screen">
            <svg role="img" height="16" width="16" viewBox="0 0 16 16">
              <path d="M6.064 10.229l-2.418 2.418L2 11v4h4l-1.647-1.646 2.418-2.418-.707-.707zM11 2l1.647 1.647-2.418 2.418.707.707 2.418-2.418L15 6V2h-4z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayingBar;
