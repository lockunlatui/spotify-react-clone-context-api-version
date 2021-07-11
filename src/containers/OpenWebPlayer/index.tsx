import { lazy, useState } from "react";

import Styles from "./openWebPlayer.module.scss";

/** Children Container */
import Home from "./Home";

const TopNav = lazy(() => import("@containers/TopNav"));

const OpenWebPlayer = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const onScrollTopNav = (e: any) => {
    setScrollTop(e.target.scrollTop);
  };
  return (
    <main onScroll={onScrollTopNav} className={Styles.container}>
      <TopNav scrollHeight={scrollTop} />
      <Home />
    </main>
  );
};

export default OpenWebPlayer;
