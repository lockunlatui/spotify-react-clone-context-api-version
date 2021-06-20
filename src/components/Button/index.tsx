import c from "classnames";
import Styles from "./button.module.scss";

type IButtonProps = {
  children?: any;
  color?: any;
  backgroundColor?: any;
  className?: string;
};

const Button = ({
  children,
  color,
  backgroundColor,
  className,
}: IButtonProps) => {
  return (
    <button
      style={{
        color: color,
        backgroundColor: backgroundColor,
      }}
      className={c(Styles.button, className)}
    >
      {children}
    </button>
  );
};

export default Button;
