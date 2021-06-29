/** Components */
import { Logo } from "@components/index";

import Styles from "./sideBar.module.scss";
const SideBar = () => {
  return (
    <nav className={Styles.container}>
      <div className={Styles.logoContainer}>
        <Logo />
      </div>
    </nav>
  );
};

export default SideBar;
