import { useContext, useEffect } from "react";

/** Components */
import { Typography, Button } from "@components/index";

/** Store */
import { StoreContext } from "@store/store-context";

/** Utils */
import { Images } from "@utils/index";

/** Enums */
import { LocalStorages } from "@enums/index";

/** Actions */
import { getAListOfNewReleases } from "@store/actions/openWebPlayer/home";
import { putPlay } from "@store/actions/nowPlayingBar";

import Styles from "./listOfNewRelease.module.scss";

let isFetching: boolean = false;

const ListOfNewRelease = () => {
  const [state, dispatch] = useContext(StoreContext);
  const { listOfNewRelease } = state.openWebPlayer.home;
  useEffect(() => {
    if (!Boolean(isFetching)) {
      getAListOfNewReleases(dispatch);
      isFetching = true;
    }
  }, [dispatch]);

  const onPlay = (track: any) => {
    const player: any = window.onSpotifyWebPlaybackSDKReady();
    player.addListener("ready", ({ device_id }: any) => {
      localStorage.setItem(LocalStorages.DeviceId, device_id);
      const body = {
        spotifyUri:track.uri,
        position: 0,
      };
      putPlay(dispatch, device_id, body);
    });
    player.connect().then((success: any) => {
      if (success) {
        console.log("The Web Playback SDK successfully connected to Spotify!");
      }
    });
    player.connect();
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.listOfNewReleaseTitle}>
        <Typography className={Styles.title} variant="h5">
          List of New Releases
        </Typography>
        <Typography className={Styles.subTitle} variant="subtitle1">
          Playlists to match your mood.
        </Typography>
      </div>
      <div className={Styles.listOfNewReleaseList}>
        {!listOfNewRelease.isFetching ? (
          <ul>
            {listOfNewRelease.data?.albums?.items.map((item: any) => {
              return (
                <li key={item.id} onClick={() => onPlay(item)}>
                  <figure>
                    <img
                      src={
                        item?.images?.length !== 0
                          ? item?.images?.[0].url
                          : Images["SPOTIFYFREE"]
                      }
                      alt={item.name}
                    />
                  </figure>
                  <Typography className={Styles.nameSong} variant="body2">
                    {item.name}
                  </Typography>
                  <Typography className={Styles.artistSong} variant="body2">
                    {item?.artists?.length !== 0
                      ? item?.artists.map((artist: any) => {
                          return <span key={artist.id}>{artist.name}</span>;
                        })
                      : null}
                  </Typography>
                  <Button className={Styles.btnPlay}>
                    <svg
                      height="16"
                      role="img"
                      width="16"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <polygon
                        points="21.57 12 5.98 3 5.98 21 21.57 12"
                        fill="currentColor"
                      ></polygon>
                    </svg>
                  </Button>
                </li>
              );
            })}
          </ul>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
};

export default ListOfNewRelease;
