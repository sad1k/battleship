import styles from "../../Battleship.module.css";

export const TIMEFORSTEP = 5000;

interface IProps {
  timeLeft: number;
}

export const Timer = ({ timeLeft }: IProps) => {
  return (
    <div className={styles.timer}>
      <span>{`${Math.floor(timeLeft / 1000)} сек :${(timeLeft % 1000)
        .toString()
        .padStart(3, "0")} мс`}</span>
    </div>
  );
};
