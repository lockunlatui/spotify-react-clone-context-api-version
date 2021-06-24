import { Images } from '@utils/index';

import { Typography, Button } from "@components/index";
import Styles from "./notFound.module.scss";
const NotFound = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.notFoundContainer}>
        <div className={Styles.notFoundContent}>
          <Typography className={Styles.pageNotFound} variant="h5">Trang này không còn tồn tại.</Typography>
          <Typography className={Styles.desc} variant="subtitle1">
            We couldn’t find the page you were looking for. Maybe our FAQ or
            Community can help?
          </Typography>
          <Button className={Styles.backBtn}>Quay Lại</Button>
        </div>
        <div className={Styles.notFoundImage}>
          <img
            alt="Record"
            className={Styles.record}
            src={Images['RECORD']}
          />
          <img
            className={Styles.recordArm}
            alt="RecordArm"
            src={Images['RECORDARM']}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
