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
  const { playerCurrentlyPlayed, track } = state.nowPlayingBar;
  useEffect(() => {
    getPlayerCurrentlyPlaying(dispatch);
  }, [dispatch]);

  return (
    <div className={Styles.container}>
      {!playerCurrentlyPlayed.isFetching ? (
        <PlayingBar
          playingMusicData={playerCurrentlyPlayed}
          isPlaying={false}
        />
      ) : !track.isFetching ? (
        <PlayingBar playingMusicData={track} isPlaying={true} />
      ) : (
        <PlayingBar />
      )}
    </div>
  );
};

export default NowPlayingBar;
