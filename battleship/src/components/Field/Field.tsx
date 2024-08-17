// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import styles from "../../Battleship.module.css";
import { Cell } from "../Cell/Cell";
import { CellStatus } from "../Cell";
import { SyntheticEvent } from "react";

interface IProps {
  isEnemyField: boolean;
  field: number[][];
  isMyStep: boolean;
  makeShoot: (x: number, y: number, isEnemyField: boolean) => void;
  setField: React.Dispatch<React.SetStateAction<CellStatus[][]>>;
}

export const Field = ({
  isEnemyField,
  field,
  isMyStep,
  makeShoot,
  setField,
}: IProps) => {
  const handleClick = (e: SyntheticEvent<HTMLDivElement, MouseEvent>) => {
    if (isMyStep && isEnemyField || e.metaKey) {
      const [x, y] = e.target.id.split("-") as string[];
      makeShoot(+x, +y, isEnemyField);
      setField(structuredClone(field));
    }
  };

  return (
    <div
      onClick={handleClick}
      className={isMyStep ? styles.battleship : styles.disabled}
    >
      {field.map((row, index1) => {
        return (
          <div className={styles.battleshipRow}>
            {row.map((field, index2) => {
              //Заюзать библиотеку classnames
              return (
                <Cell
                  x={index2}
                  y={index1}
                  status={field}
                  isEnemyField={isEnemyField}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
