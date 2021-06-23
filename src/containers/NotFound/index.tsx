import { Typography, Button } from "@components/index";
import Styles from "./notFound.module.scss";
const NotFound = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.notFoundContainer}>
        <div className={Styles.notFoundContent}>
          <Typography className={Styles.pageNotFound} variant="h5">Trang này không còn tồn tại.</Typography>
          <Typography variant="body2">
            We couldn’t find the page you were looking for. Maybe our FAQ or
            Community can help?
          </Typography>
          <Button>Quay Lại</Button>
        </div>
        <div className={Styles.notFoundImage}>
          <img
            alt="Record"
            className="img-responsive record"
            src="https://www.scdn.co/i/404/record.svg"
          />
          <img
            className={Styles.recordArm}
            alt="RecordArm"
            src="https://www.scdn.co/i/404/record-arm.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
