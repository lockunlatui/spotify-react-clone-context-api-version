import { useEffect, useReducer } from "react";
import { IntlProvider } from "react-intl";

/** Assets */
import translations from "@assets/translations/index";

/** Components */
import { Header, Footer } from "@containers/index";

/** Interfaces */
import { initialState, StoreContext, reducer } from "./store/store-context";

/** Routes */
import routes from "./routes";
import Loading from "./assets/images/spotifyPremium.png";
import Styles from "./app.module.scss";

/** Actions */
import { changeLanguage } from "@store/actions/header";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (language) {
      dispatch(changeLanguage(language));
    }
  }, []);

  const { header } = state;

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      <div
        style={{
          transition: "all 1s ease-in-out",
          opacity: header.user.isFetching ? 1 : 0,
          zIndex: header.user.isFetching ? 999 : -1,
          filter: "alpha(opacity=50)",
        }}
        className={Styles.loading}
      >
        <img src={Loading} alt="Loading" />
      </div>
      <IntlProvider
        defaultLocale={header.language}
        messages={translations[header.language]}
        locale={header.language}
      >
        <Header />
        {routes(header.token)}
        <Footer />
      </IntlProvider>
    </StoreContext.Provider>
  );
}

export default App;
