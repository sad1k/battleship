import classNames from "classnames";
import { CellStatus } from ".";
import styles from "../../Battleship.module.css";

interface IProps {
  x: number;
  y: number;
  status: CellStatus;
  isEnemyField: boolean;
}

export const Cell = ({ x, y, status, isEnemyField }: IProps) => {
  const cellClass = classNames({
    [styles.field]: true,
    [styles.shipField]: !isEnemyField && status === CellStatus.Ship,
    [styles.emptyField]: status === CellStatus.Empty || status === CellStatus.Ship && isEnemyField,
    [styles.hittedField]: status === CellStatus.Hitted,
    [styles.missField]: status === CellStatus.Miss,
  });
  return <div id={`${x}-${y}`} className={cellClass}></div>;
};
