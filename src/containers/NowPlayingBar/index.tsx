import Typography from "@components/Typography";
import { useEffect, useState } from "react";
import Styles from "./nowPlayingBar.module.scss";

const NowPlayingBar = () => {
  const [track, setTrack] = useState({
    album: {
      images: [{ url: "" }],
      artists: [
        {
          name :''
        }
      ]
    },
    name: "",
  });
  const [trackPlaying, setTrackPlaying] = useState({
    item: {
      name: "",
      album: {
        name: "",
      },
    },
  });

  useEffect(() => {
    const getPlayerCurrentlyPlayed = async () => {
      const dataPlayer = await fetch(
        "/api/v1/me/player/recently-played?limit=1"
      )
        .then((resp) => {
          return resp.json();
        })
        .then((resp) => {
          return resp.data;
        })
        .catch((error) => {
          console.log("error", error);
        });
      getTrackById(dataPlayer.items[0].track.id);
    };
    const getTrackById = async (id: string) => {
      const trackData = await fetch(`/api/v1/tracks/${id}`)
        .then((resp) => {
          return resp.json();
        })
        .then((resp) => {
          return resp.data;
        })
        .catch((error) => {
          console.log("error", error);
        });
      setTrack(trackData);
    };
    const getPlayerCurrentlyPlaying = async () => {
      const dataPlayer = await fetch("/api/v1/me/player/currently-playing")
        .then((resp) => {
          return resp.json();
        })
        .then((resp) => {
          return resp.data;
        })
        .catch((error) => {
          console.log("error", error);
        });
      setTrackPlaying(dataPlayer);
    };
    getPlayerCurrentlyPlaying();
    getPlayerCurrentlyPlayed();
  }, []);

  console.log("trackPlaying====>0", track)

  return (
    <div className={Styles.container}>
      <div className={Styles.nowPlayingBarContainer}>
        <div>
          <div className={Styles.left}>
            <img src={track?.album?.images[0]?.url} alt={track?.name} />
            <div className={Styles.track}>
              <Typography className={Styles.nameTrack} variant="body2">{track?.name}</Typography>
              <Typography className={Styles.artistTrack} variant="caption">{track?.album?.artists[0].name}</Typography>
            </div>
          </div>
          <div className={Styles.middle}>Now Playing Bar</div>
          <div className={Styles.right}>Now Playing Bar</div>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingBar;
