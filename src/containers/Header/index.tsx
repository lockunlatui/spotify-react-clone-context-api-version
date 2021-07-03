import { useState } from "react";
import c from "classnames";
import { Link } from "react-router-dom";

/** Mocks */
import { menus } from "@mocks/Header/index";

/** Components */
import { Logo } from "@components/index";
import Nav from "./Nav";
import MultipleLanguage from "./MultipleLanguage";

/** Enums */
import { Routes } from "@enums/routes";

/** Styles */
import Styles from "./header.module.scss";

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const onOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const onCloseMenu = () => {
    setIsOpenMenu(false);
  };

  /** RENDER UI */
  const renderNav = () => {
    return (
      <div className={Styles.navContainer}>
        <div className={Styles.wrapper}>
          <div className={Styles.brandWrapper}>
            <Link to={Routes.HomePage} className={Styles.logoLink}>
              <span>
                <Logo />
              </span>
            </Link>
          </div>
          <Nav menus={menus} />
          <div
            className={c(Styles.mobileMenu, isOpenMenu && Styles.openMobile)}
          >
            <button
              onClick={() => onOpenMenu()}
              className={Styles.menuButtonExpand}
              type="button"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          {isOpenMenu && (
            <div onClick={() => onCloseMenu()} className={Styles.overlay} />
          )}
          {isOpenMenu && <Nav isOpenOfMobile={isOpenMenu} menus={menus} />}
        </div>
      </div>
    );
  };
  return (
    <header className={Styles.header}>
      <MultipleLanguage />
      {renderNav()}
    </header>
  );
};

export default Header;
