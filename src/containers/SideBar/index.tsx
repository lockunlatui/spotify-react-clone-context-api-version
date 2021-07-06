import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";

/** Components */
import { Button, Logo, Typography } from "@components/index";

/** Mocks */
import { menus } from "@mocks/SideBar";

/** Interface */
import { Menu } from "@interfaces/SideBar";

import Styles from "./sideBar.module.scss";

const SideBar = () => {
  const location = useLocation();
  const [playLists, setPlayLists] = useState({
    items: [],
  });

  useEffect(() => {
    const getPlaylists = async () => {
      const data = await fetch("/api/v1/me/playlists")
        .then((resp) => {
          return resp.json();
        })
        .then((resp) => resp.data)
        .catch((error) => {
          console.log("error", error);
        });
      setPlayLists(data);
    };
    getPlaylists();
  }, []);

  return (
    <nav className={Styles.container}>
      <div className={Styles.logoContainer}>
        <Logo />
      </div>
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
