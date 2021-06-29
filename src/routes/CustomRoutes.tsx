import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

/** Components */
import {
  Main,
  IntroductionMain,
  NotFound,
  OpenWebPlayer,
  Header,
  Footer,
  SideBar,
  TopNav,
} from "@containers/index";

/** Constants */
import { ROUTES } from "@constants/routes";

import Styles from "./routes.module.scss";

const CustomRoutes = () => {
  const location = useLocation();

  const [isShowHeaderFooter, setIsShowHeaderFooter] = useState(false);
  const renderRouter = (
    rest: any,
    condition: boolean,
    Component: any,
    path: string
  ) => {
    return (
      <Route
        {...rest}
        render={(props: any) => {
          if (condition) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: path,
                  state: { from: props.location },
                }}
              />
            );
          }
        }}
      />
    );
  };

  const PrivateComponent = ({ component: Component, auth, ...rest }: any) => {
    return renderRouter(rest, auth, Component, ROUTES.HOME_PAGE);
  };

  const PublicComponent = ({ component: Component, auth, ...rest }: any) => {
    return renderRouter(rest, !auth, Component, ROUTES.HOME_PAGE_LOGGED);
  };

  const user: any = localStorage.getItem("user");
  console.log("user", user);
  const isAuthenticated = Boolean(user)
    ? Object.keys(JSON.parse(user))?.length
    : false;

  useEffect(() => {
    setIsShowHeaderFooter(!location.pathname?.includes(ROUTES.OPEN));
  }, [location]);

  if (isShowHeaderFooter) {
    return (
      <>
        <Header />
        <Switch>
          <PublicComponent
            auth={Boolean(isAuthenticated)}
            path={ROUTES.HOME_PAGE}
            exact
            component={Main}
          />
          <PrivateComponent
            auth={Boolean(isAuthenticated)}
            path={ROUTES.HOME_PAGE_LOGGED}
            component={IntroductionMain}
          />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </>
    );
  }
  return (
    <div className={Styles.openPlayerContainer}>
      <SideBar />
      <TopNav />
      <Switch>
        <PrivateComponent
          auth={Boolean(isAuthenticated)}
          path={ROUTES.OPEN}
          component={OpenWebPlayer}
        />
      </Switch>
    </div>
  );
};

export default CustomRoutes;
