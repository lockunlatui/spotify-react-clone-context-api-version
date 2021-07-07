import Styles from "./openWebPlayer.module.scss";

/** Children Container */
import Home from "./Home";

const OpenWebPlayer = () => {
  return (
    <main className={Styles.container}>
      <Home />
    </main>
  );
};

export default OpenWebPlayer;
