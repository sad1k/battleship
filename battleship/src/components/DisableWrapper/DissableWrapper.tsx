import styles from "../../Battleship.module.css";

export const DissableWrapper = ({ ...props }) => {
  const style = {
    pointerEvents: props.disabled ? "none" : "auto", // Отключает все клики, если disable=true
    opacity: props.disabled ? 0.5 : 1, // Дополнительно визуально затемняет контент, когда он отключен (по желанию)
  };
  
  return (
    <>
      <div
        style={{ ...style, ...props.style }}
        className={props.disabled ? styles.disabled : ""}
      >
        {props.children}
      </div>
    </>
  );
};
