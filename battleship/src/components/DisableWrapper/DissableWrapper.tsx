import styles from "../../Battleship.module.css";

export const DissableWrapper = ({ ...props }) => {
  const style = {
    pointerEvents: props.disabled ? "none" : "auto",
    opacity: props.disabled ? 0.5 : 1,
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
