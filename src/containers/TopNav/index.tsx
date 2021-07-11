import { useContext, useEffect } from "react";
import Styles from "./topNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

/** Components */
import { Button, Typography } from "@components/index";

/** Enums */
import { Colors } from "@enums/index";

/** Store */
import { StoreContext } from "@store/store-context";

/** Actions */
import { getUser } from "@store/actions/header";

const TopNav = () => {
  const [state, dispatch] = useContext(StoreContext);
  const { user } = state.header;

  useEffect(() => {
    getUser(dispatch);
  }, [dispatch]);
  return (
    <div className={Styles.container}>
      <div className={Styles.topContainer}>
        <div className={Styles.btnContainer}>
          <Button className={Styles.btnLeft}>
            <FontAwesomeIcon color={Colors.White} icon={faChevronLeft} />
          </Button>
          <Button className={Styles.btnLeft}>
            <FontAwesomeIcon color={Colors.White} icon={faChevronRight} />
          </Button>
        </div>
        <div className={Styles.profileMenu}>
          <Button>
            {Boolean(user.data.photo) ? (
              <figure title={user.data.displayName}>
                <img src={user.data.photo} alt={user.data.displayName} />
              </figure>
            ) : (
              <figure title={user.data.displayName}>
                <FontAwesomeIcon color={Colors.White} icon={faUserCircle} />
              </figure>
            )}

            <Typography variant="body2">{user.data.displayName}</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
