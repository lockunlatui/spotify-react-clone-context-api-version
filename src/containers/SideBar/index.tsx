import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** Components */
import { Button, Logo } from "@components/index";

/** Mocks */
import { menus } from "@mocks/SideBar";

import Styles from "./sideBar.module.scss";
const SideBar = () => {
  const location = useLocation();

  return (
    <nav className={Styles.container}>
      <div className={Styles.logoContainer}>
        <Logo />
      </div>
      <ul className={Styles.menus}>
        {menus.map((menu: any) => {
          return (
            <li
              className={location.pathname === menu.link ? Styles.active : ""}
            >
              <FontAwesomeIcon icon={menu.icon} />
              <Button>{menu.name}</Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideBar;
