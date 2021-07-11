import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";

/** Constants */
import { Routes } from "@enums/index";

import Styles from "./routes.module.scss";

/** Components */
const Main = lazy(() => import("@containers/Main"));
const IntroductionMain = lazy(() => import("@containers/IntroductionMain"));
const NotFound = lazy(() => import("@containers/NotFound"));
const OpenWebPlayer = lazy(() => import("@containers/OpenWebPlayer"));
const Header = lazy(() => import("@containers/Header"));
const Footer = lazy(() => import("@containers/Footer"));
const SideBar = lazy(() => import("@containers/SideBar"));
const NowPlayingBar = lazy(() => import("@containers/NowPlayingBar"));

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
    return renderRouter(rest, auth, Component, Routes.HomePage);
  };

  const PublicComponent = ({ component: Component, auth, ...rest }: any) => {
    return renderRouter(rest, !auth, Component, Routes.HomePageHasAuthenticate);
  };

  const user: any = localStorage.getItem("user");

  const isAuthenticated = Boolean(user)
    ? Object.keys(JSON.parse(user))?.length
    : false;

  useEffect(() => {
    setIsShowHeaderFooter(!location.pathname?.includes(Routes.Open));
  }, [location]);

  if (isShowHeaderFooter) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Switch>
          <PublicComponent
            auth={Boolean(isAuthenticated)}
            path={Routes.HomePage}
            exact
            component={Main}
          />
          <PrivateComponent
            auth={Boolean(isAuthenticated)}
            path={Routes.HomePageHasAuthenticate}
            component={IntroductionMain}
          />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={Styles.openPlayerContainer}>
        <SideBar />
       
        <Switch>
          <PrivateComponent
            auth={Boolean(isAuthenticated)}
            path={Routes.Open}
            component={OpenWebPlayer}
          />
        </Switch>
        <NowPlayingBar />
      </div>
    </Suspense>
  );
};

export default CustomRoutes;
