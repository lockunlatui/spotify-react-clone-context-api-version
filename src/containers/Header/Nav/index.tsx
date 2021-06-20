import { useEffect, useContext, useState, useRef } from "react";
import Styles from "./nav.module.scss";
import c from "classnames";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

/** Actions */
import { getUser } from "@store/actions/index";

/** Interfaces */
import { IMenu } from "@interfaces/Header";

/** Store */
import { StoreContext } from "@store/store-context";

/** Hooks */
import useOnClickOutside from "@hooks/useOnClickOutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Colors } from "@constants/index";

type INavProps = {
  menus: IMenu[];
  isOpenOfMobile?: boolean;
};

const Nav = ({ menus, isOpenOfMobile }: INavProps) => {
  const [state, dispatch] = useContext(StoreContext);
  const [isShowProfile, setIsShowProfile] = useState(false);
  const profileRef = useRef(null);
  useOnClickOutside(profileRef, () => setIsShowProfile(false));
  const { user } = state.header;

  useEffect(() => {
    getUser(dispatch);
  }, [dispatch]);

  const onShowProfileMenu = () => {
    setIsShowProfile(!isShowProfile);
  };

  const renderProfile = (idxMenu: number, menus: any, itemMenu: any) => {
    if (Boolean(Object.keys(user.data).length)) {
      if (idxMenu === menus.length - 2) {
        return;
      }
      if (idxMenu === menus.length - 1) {
        return (
          <div ref={profileRef} className={Styles.profileContainer}>
            <button
              onClick={() => onShowProfileMenu()}
              className={Styles.btnProfile}
            >
              {Boolean(user.data.photo) ? (
                <img
                  className={Styles.profileImg}
                  src={user.data.photo}
                  alt="Avatar"
                />
              ) : (
                <FontAwesomeIcon color={Colors.white} icon={faUserCircle} />
              )}

              <div className={Styles.profileTitle}>
                <span>Hồ Sơ</span>
                <svg
                  className={isShowProfile ? Styles.active : undefined}
                  viewBox="0 0 1024 1024"
                >
                  <path d="M476.455 806.696L95.291 425.532Q80.67 410.911 80.67 390.239t14.621-34.789 35.293-14.117 34.789 14.117L508.219 698.8l349.4-349.4q14.621-14.117 35.293-14.117t34.789 14.117 14.117 34.789-14.117 34.789L546.537 800.142q-19.159 19.159-38.318 19.159t-31.764-12.605z"></path>
                </svg>
              </div>
            </button>
            {isShowProfile && (
              <div className={Styles.showProfileMenu}>
                <ul className={Styles.wrapList}>
                  <li className={Styles.list}>
                    <a href="https://www.spotify.com/vn-vi/account/overview/">
                      Tài khoản
                    </a>
                  </li>
                  <li className={Styles.list}>
                    <a href="/api/v1/logout">Đăng xuất</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        );
      }
    }
    return (
      !itemMenu.isSeparator && (
        <a href={`/${itemMenu.link}`}>{itemMenu.itemName}</a>
      )
    );
  };

  return (
    <nav
      role="navigation"
      className={c(
        isOpenOfMobile ? Styles.navMobile : Styles.nav,
        isOpenOfMobile && Styles.animationRTL
      )}
    >
      <ul className={Styles.menus}>
        {menus.map((menu: IMenu, index: number) => {
          return (
            <li
              key={menu.id}
              className={menu.isSeparator ? Styles.separator : Styles.item}
            >
              {renderProfile(index, menus, menu)}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
