import c from "classnames";
import Styles from "./typography.module.scss";

type ITypographyProps = {
  variant?: string;
  className?: string;
  style?: any;
  children?: any;
};

const Typography = ({
  variant,
  className,
  style,
  children,
}: ITypographyProps) => {
  const renderTypography = () => {
    switch (variant) {
      case "caption":
        return (
          <span style={style} className={c(Styles.caption, className)}>
            {children}
          </span>
        );
      case "body2":
        return (
          <span style={style} className={c(Styles.body2, className)}>
            {children}
          </span>
        );
      case "subtitle1":
        return (
          <span style={style} className={c(Styles.subtitle1, className)}>
            {children}
          </span>
        );
      case "h3":
        return (
          <h3 style={style} className={c(Styles.h3, className)}>
            {children}
          </h3>
        );
      case "h5":
        return (
          <h5 style={style} className={c(Styles.h5, className)}>
            {children}
          </h5>
        );
      default:
        return (
          <h1 style={style} className={c(Styles.h1, className)}>
            {children}
          </h1>
        );
    }
  };
  return renderTypography();
};

export default Typography;
