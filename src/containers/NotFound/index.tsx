import { FormattedMessage } from "react-intl";

/** Utils */
import { Images } from "@utils/index";

/** Components */
import { Typography, Button } from "@components/index";

/** Styles */
import Styles from "./notFound.module.scss";

const NotFound = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.notFoundContainer}>
        <div className={Styles.notFoundContent}>
          <Typography className={Styles.pageNotFound} variant="h5">
            <FormattedMessage id="notFound.title" />
          </Typography>
          <Typography className={Styles.desc} variant="subtitle1">
            <FormattedMessage id="notFound.desc" />
          </Typography>
          <Button className={Styles.backBtn}>
            {" "}
            <FormattedMessage id="notFound.button.goBack" />
          </Button>
        </div>
        <div className={Styles.notFoundImage}>
          <img alt="Record" className={Styles.record} src={Images["RECORD"]} />
          <img
            className={Styles.recordArm}
            alt="RecordArm"
            src={Images["RECORDARM"]}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
