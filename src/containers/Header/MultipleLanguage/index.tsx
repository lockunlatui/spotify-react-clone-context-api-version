import { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { StoreContext } from "@store/store-context";

/** Actions */
import { changeLanguage } from "@store/actions/header";

/** Styles */
import Styles from "./multipleLanguage.module.scss";

/** Enums */
import { Languages } from "@enums/index";

const MultipleLanguage = (props: any) => {
  const [state, dispatch] = useContext(StoreContext);

  const { header } = state;

  const onChangeLanguage = () => {
    const language =
      header.language === Languages.English
        ? Languages.Vietnamese
        : Languages.English;
    localStorage.setItem("language", language);
    dispatch(changeLanguage(language));
  };
  return (
    <div className={Styles.languageMultiWrapper}>
      <div className={Styles.languageBar}>
        <div className={Styles.wrapMultiLanguageLink} dir="ltr">
          <div
            className={Styles.multiLanguageLink}
            onClick={() => onChangeLanguage()}
          >
            <FormattedMessage id="header.multipleLanguage.linkName" />
          </div>
        </div>
        <button className={Styles.mhClose}>
          <span aria-hidden={true}>✕</span>
          <span className={Styles.mhScreenReadOnly}>Close</span>
        </button>
      </div>
    </div>
  );
};

export default MultipleLanguage;
