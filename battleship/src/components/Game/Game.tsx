import { CellStatus } from "../Cell";
import { createField, getRandomIds } from "../../utils/createField";
import styles from "../../Battleship.module.css";
import { Field } from "../Field/Field";
import { makeEvent } from "../../utils/makeEvent";
import { changeBoardAfterShoot } from "../../utils/changeBoardAfterShoot";
import { memo, useState } from "react";
import { Modal } from "../Modal/Modal";

export const ISBOT = "isbot";

interface GameProps {
  getField: (user: boolean) => CellStatus[][];
  setField: (
    user: boolean
  ) => React.Dispatch<React.SetStateAction<CellStatus[][]>>;
  disabled: boolean;
  isStarted: boolean;
  countToWin: number;
  countToLose: number;
  setCountToWin: React.Dispatch<React.SetStateAction<number>>;
  setCountToLose: React.Dispatch<React.SetStateAction<number>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
  stopGame: () => void;
}

export const Game = memo(function ({
  getField,
  setField,
  disabled,
  setDisabled,
  reset,
  countToWin,
  countToLose,
  setCountToWin,
  setCountToLose,
  stopGame,
}: GameProps) {
  const myField = getField(true);
  const enemyField = getField(false);
  const [open, setOpen] = useState(false);

  const shoot = (x: number, y: number, isEnemyField: boolean) => {
    if (!disabled && isEnemyField) {
      userShoot(x, y);
    } else {
      shootMe(x, y);
    }
  };

  const shootMe = (x: number, y: number) => {
    const isHit = myField[y][x] === CellStatus.Ship;
    changeBoardAfterShoot(myField, x, y, isHit);
    if (!isHit) {
      setDisabled(false);
    } else {
      if (countToLose === 1) {
        setOpen(true);
        stopGame();
      } else {
        simulateClick(false);
      }
      setCountToLose((c) => c - 1);
    }
  };

  const simulateClick = (user: boolean) => {
    const [x, y] = getRandomIds(user ? enemyField : myField)
      .split("-")
      .map(Number);
    const cell = document.querySelectorAll(`div[id='${x}-${y}']`)[user ? 1 : 0];
    makeEvent(cell, user);
    reset();
  };

  const userShoot = (x: number, y: number) => {
    const isHit = enemyField[y][x] === CellStatus.Ship;
    changeBoardAfterShoot(enemyField, x, y, isHit);
    if (isHit) {
      if (countToWin === 1) {
        setOpen(true);
        stopGame();
      } else {
        setDisabled(false);
      }
      setCountToWin((c) => c - 1);
    } else {
      setDisabled(true);
      simulateClick(false);
    }
  };

  return (
    <div className={styles.game}>
      <Field
        field={myField}
        isMyStep={false}
        makeShoot={shoot}
        isEnemyField={false}
        setField={setField(true)}
      />
      <Field
        field={enemyField}
        isMyStep={!disabled}
        makeShoot={shoot}
        isEnemyField
        setField={setField(false)}
      />
      <Modal
        open={open}
        onClose={() => {
          const isUserWin = countToWin === 0;
          setField(!isUserWin)(() => createField());
          setCountToLose(3);
          setCountToWin(3);
          setOpen(false);
        }}
      >
        {countToWin == 0
          ? "Ура вы победили!"
          : countToLose == 0
          ? "Увы вы проиграли"
          : ""}
      </Modal>
    </div>
  );
})
