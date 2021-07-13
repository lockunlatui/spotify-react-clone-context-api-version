import { useContext, useEffect } from "react";
/** Actions */
import { getPlayerCurrentlyPlaying } from "@store/actions/nowPlayingBar";

/** Store */
import { StoreContext } from "@store/store-context";

/** Styles */
import Styles from "./nowPlayingBar.module.scss";

/** Components */
import PlayingBar from "./PlayingBar";

const NowPlayingBar = () => {
  const [state, dispatch] = useContext(StoreContext);
  const { playerCurrentlyPlayed, track, playerCurrentlyPlaying } =
    state.nowPlayingBar;
  useEffect(() => {
    getPlayerCurrentlyPlaying(dispatch);
  }, [dispatch]);

  const renderLoading = () => {
    return <PlayingBar />;
  };

  const renderPlayList = () => {
    if (playerCurrentlyPlaying?.data?.progress_ms) {
      if (track.isFetching) {
        return renderLoading();
      } else {
        return <PlayingBar playingMusicData={track} />;
      }
    } else {
      if (playerCurrentlyPlayed.isFetching) {
        return renderLoading();
      } else {
        return <PlayingBar playingMusicData={playerCurrentlyPlayed} />;
      }
    }
  };

  return <div className={Styles.container}>{renderPlayList()}</div>;
};

export default NowPlayingBar;
