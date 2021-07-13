import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faImage } from "@fortawesome/free-regular-svg-icons";
import { useContext, useEffect, useState } from "react";
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
import {
  getPlayerCurrentlyPlaying,
  putPlay,
  putPause,
  getPlayer,
} from "@store/actions/nowPlayingBar";

/** Enums */
import { Colors, LocalStorages, Times, Numbers } from "@enums/index";

/** Styles */
import Styles from "./playingBar.module.scss";
import Images from "@utils/Images";
import axios from "@services/interceptor";

let timeInterval: ReturnType<typeof setInterval>;

const PlayingBar = ({ playingMusicData, isPlaying }: any) => {
  const [state, dispatch] = useContext(StoreContext);
  const { playerCurrentlyPlaying } = state.nowPlayingBar;
  const [currentTime, setCurrentTime] = useState(Times.TimeStart);
  const [percentTime, setPercentTime] = useState(Numbers.Zero);

  const track = Boolean(playerCurrentlyPlaying?.data?.progress_ms)
    ? {
        image: playingMusicData?.data?.album?.images?.[Numbers.Zero].url,
        trackName: playingMusicData?.data?.name,
        artistName: playingMusicData?.data?.artists?.[Numbers.Zero]?.name,
        durationTime: playingMusicData?.data?.duration_ms,
        uri: playingMusicData?.data?.album?.uri,
      }
    : {
        image:
          playingMusicData?.data?.items?.[Numbers.Zero]?.track?.album?.images[
            Numbers.Zero
          ].url,
        trackName: playingMusicData?.data?.items?.[Numbers.Zero]?.track?.name,
        artistName:
          playingMusicData?.data?.items?.[Numbers.Zero]?.track?.artists[
            Numbers.Zero
          ]?.name,
        durationTime:
          playingMusicData?.data?.items?.[Numbers.Zero]?.track?.duration_ms,
        uri: playingMusicData?.data?.items?.[Numbers.Zero]?.track?.uri,
        position:
          playingMusicData?.data?.items?.[Numbers.Zero]?.track?.track_number,
      };

  useEffect(() => {
    getPlayer(dispatch);
  }, [dispatch, track.uri]);

  useEffect(() => {
    const resetState = () => {
      if (!Boolean(playerCurrentlyPlaying?.data?.progress_ms)) {
        setPercentTime(Numbers.Zero);
        setCurrentTime(getDurationTime(Numbers.Zero));
      }
      clearInterval(timeInterval);
    };
    if (Boolean(playerCurrentlyPlaying?.data?.is_playing)) {
      let countTime = playerCurrentlyPlaying?.data?.progress_ms;
      const durationTime = playerCurrentlyPlaying?.data?.item?.duration_ms;
      timeInterval = setInterval(() => {
        if (countTime <= durationTime) {
          countTime += Times.OneMillisecond;
          setPercentTime((countTime / durationTime) * Numbers.OneHundred);
          setCurrentTime(getDurationTime(countTime));
        } else {
          const player: any = window.onSpotifyWebPlaybackSDKReady();

          player.getCurrentState().then((state: any) => {
            if (!state) {
              console.error(
                "User is not playing music through the Web Playback SDK"
              );
              return;
            }

            let {
              current_track,
              next_tracks: [next_track],
            } = state.track_window;

            console.log("Currently Playing", current_track);
            console.log("Playing Next", next_track);
          });
          getPlayerCurrentlyPlaying(dispatch);
          resetState();
        }
      }, Times.OneMillisecond);
    } else {
      resetState();
    }
    return () => {
      clearInterval(timeInterval);
    };
  }, [dispatch, playerCurrentlyPlaying]);

  const getDurationTime = (duration: number): any => {
    const minutes = Math.floor(
      duration / (Times.OneMillisecond * Times.OneMinute)
    );
    const seconds: any = (
      (duration % (Times.OneMillisecond * Times.OneSecond)) /
      Times.OneMillisecond
    ).toFixed(Numbers.Zero);
    return `${minutes}: ${
      seconds < Numbers.Ten ? Numbers.Zero : ""
    } ${seconds}`;
  };

  const onPlay = () => {
    const user: any = localStorage.getItem("user");

    const token = Boolean(user) ? JSON.parse(user) : "";
    axios
      .get(`https://api.spotify.com/v1/me/player/devices`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((response: any) => {
        console.log("response", response);
        if (response.data?.devices?.length !== 0) {
          putPlay(
            dispatch,
            response?.data?.devices[0].id,
            track.uri,
            playerCurrentlyPlaying?.data?.progress_ms,
            token.token
          );
        }
      });
  };

  const onPause = () => {
    const user: any = localStorage.getItem("user");
    const token = Boolean(user) ? JSON.parse(user) : "";

    axios
      .get(`https://api.spotify.com/v1/me/player/devices`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((response: any) => {
        console.log("response", response);
        if (response.data?.devices?.length !== 0) {
          console.log("=====", playerCurrentlyPlaying?.data?.progress_ms);
          setCurrentTime(
            getDurationTime(playerCurrentlyPlaying?.data?.progress_ms)
          );
          putPause(dispatch, response?.data?.devices[0].id, token.token);
        }
      });
  };

  const onNext = () => {
    const user: any = localStorage.getItem("user");
    const token = Boolean(user) ? JSON.parse(user) : "";

    axios
      .get(`https://api.spotify.com/v1/me/player/devices`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((response: any) => {
        console.log("response", response);
        if (response.data?.devices?.length !== 0) {
          axios
            .post(
              `https://api.spotify.com/v1/me/player/next?device_id=${response.data?.devices[0].id}`, {},
              {
                headers: {
                  Authorization: `Bearer ${token.token}`,
                },
              }
            )
            .then((response: any) => {
              getPlayerCurrentlyPlaying(dispatch)
             
            });
        }
      });
  };

  return (
    <div className={Styles.nowPlayingBarContainer}>
      <div>
        <div className={Styles.left}>
          <img
            className={isPlaying ? Styles.avatarSong : ""}
            src={Boolean(track?.image) ? track.image : Images["RECORD"]}
            alt={track?.trackName}
          />
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
              <FontAwesomeIcon
                spin={playerCurrentlyPlaying?.data?.is_playing}
                onClick={() => onPause()}
                icon={faPauseCircle}
              />
            ) : (
              <FontAwesomeIcon
                spin={playerCurrentlyPlaying?.data?.is_playing}
                onClick={() => onPlay()}
                icon={faPlayCircle}
              />
            )}
            <FontAwesomeIcon onClick={() => onNext()} icon={faStepForward} />
            <FontAwesomeIcon icon={faRedo} />
          </div>
          <div className={Styles.playBar}>
            <Typography className={Styles.durationTime} variant="caption">
              {currentTime}
            </Typography>
            <div
              style={{ position: "relative" }}
              className={
                playerCurrentlyPlaying?.data?.progress_ms
                  ? Styles.progressBar
                  : Styles.loading
              }
            >
              {!playerCurrentlyPlaying?.data?.progress_ms ? (
                "♪ ♪ ♪ ♪ ♪ ♪ "
              ) : (
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
              )}
            </div>

            <Typography className={Styles.durationTime} variant="caption">
              {track?.durationTime
                ? getDurationTime(track?.durationTime)
                : Times.TimeStart}
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
