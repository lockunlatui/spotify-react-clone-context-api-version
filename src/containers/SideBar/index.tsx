import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";

/** Components */
import { Button, Logo, Typography } from "@components/index";

/** Mocks */
import { menus } from "@mocks/SideBar";

/** Actions */
import { StoreContext } from "@store/store-context";
import { getPlaylists } from "@store/actions/sideBar";

/** Interface */
import { Menu } from "@interfaces/SideBar";

import Styles from "./sideBar.module.scss";

const SideBar = () => {
  const [state, dispatch] = useContext(StoreContext);
  const location = useLocation();
  const [playLists, setPlayLists] = useState({
    items: [],
  });

  useEffect(() => {
    if (Object.keys(state.sidebar.playlists.data).length === 0) {
      Promise.resolve(getPlaylists(dispatch)).then((value: any) => {
        console.log("value", value)
        if(Boolean(value)) {
          setPlayLists(value);
        }
    
      });
    }
  }, [dispatch, state.sidebar.playlists.data]);

  return (
    <nav className={Styles.container}>
      <Link to="/">
        <div className={Styles.logoContainer}>
          <Logo />
        </div>
      </Link>
      <ul className={Styles.menus}>
        {menus.map((menu: Menu) => {
          return (
            <li
              key={menu.id}
              className={location.pathname === menu.link ? Styles.active : ""}
            >
              <Link to={menu.link}>
                <FontAwesomeIcon icon={menu.icon} />
                <Button>{menu.name}</Button>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={Styles.line} />
      <ul className={Styles.playlists}>
        {playLists?.items?.map((item: any) => {
          return (
            <li key={item.id}>
              <Typography variant="subtitle1">{item.name}</Typography>
            </li>
          );
        })}
      </ul>
      <div className={Styles.installApp}>
        <FontAwesomeIcon icon={faArrowCircleDown} />
        <Typography variant="subtitle1">Install App</Typography>
      </div>
    </nav>
  );
};

export default SideBar;
