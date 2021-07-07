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
    if (playerCurrentlyPlaying?.data?.is_playing) {
      if (track.isFetching) {
        return renderLoading();
      } else {
        return <PlayingBar playingMusicData={track} isPlaying={true} />;
      }
    } else {
      if (playerCurrentlyPlayed.isFetching) {
        return renderLoading();
      } else {
        return (
          <PlayingBar
            playingMusicData={playerCurrentlyPlayed}
            isPlaying={false}
          />
        );
      }
    }
  };

  return <div className={Styles.container}>{renderPlayList()}</div>;
};

export default NowPlayingBar;
