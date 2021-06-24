import c from "classnames";
import Styles from "./button.module.scss";

type IButtonProps = {
  children?: any;
  color?: any;
  backgroundColor?: any;
  className?: string;
  variant?: string;
};

const Button = ({
  children,
  color,
  backgroundColor,
  className,
  variant,
}: IButtonProps) => {
  const variantButton = () => {
    switch (variant) {
      case "contained":
        return Styles.buttonContained;
      default:
        return Styles.button;
    }
  };
  return (
    <button
      style={{
        color: color,
        backgroundColor: backgroundColor,
      }}
      className={c(variantButton(), className)}
    >
      {children}
    </button>
  );
};

export default Button;
