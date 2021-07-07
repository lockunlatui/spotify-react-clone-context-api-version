import c from "classnames";
import Styles from "./typography.module.scss";

type ITypographyProps = {
  variant?: string;
  className?: string;
  style?: any;
  children?: any;
  title?: string;
};

const Typography = ({
  variant,
  className,
  style,
  children,
  title,
}: ITypographyProps) => {
  const renderTypography = () => {
    switch (variant) {
      case "caption":
        return (
          <span
            title={title}
            style={style}
            className={c(Styles.caption, className)}
          >
            {children}
          </span>
        );
      case "body2":
        return (
          <span
            title={title}
            style={style}
            className={c(Styles.body2, className)}
          >
            {children}
          </span>
        );
      case "subtitle1":
        return (
          <span
            title={title}
            style={style}
            className={c(Styles.subtitle1, className)}
          >
            {children}
          </span>
        );
      case "h3":
        return (
          <h3 title={title} style={style} className={c(Styles.h3, className)}>
            {children}
          </h3>
        );
      case "h4":
        return (
          <h4 title={title} style={style} className={c(Styles.h4, className)}>
            {children}
          </h4>
        );
      case "h5":
        return (
          <h5 title={title} style={style} className={c(Styles.h5, className)}>
            {children}
          </h5>
        );
      default:
        return (
          <h1 title={title} style={style} className={c(Styles.h1, className)}>
            {children}
          </h1>
        );
    }
  };
  return renderTypography();
};

export default Typography;
