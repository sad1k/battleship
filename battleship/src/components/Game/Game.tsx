import { CellStatus } from "../Cell";
import { getRandomIds } from "../../utils/createField";
import styles from "../../Battleship.module.css";
import { Field } from "../Field/Field";
import { makeEvent } from "../../utils/makeEvent";
import { changeBoardAfterShoot } from "../../utils/changeBoardAfterShoot";
import { DissableWrapper } from "../DisableWrapper/DissableWrapper";
import { useEffect, useState } from "react";
import { Modal } from "../Modal/Modal";

export const ISBOT = "isbot";

interface GameProps {
  getField: (user: boolean) => CellStatus[][];
  setField: (
    user: boolean
  ) => React.Dispatch<React.SetStateAction<CellStatus[][]>>;
  disabled: boolean;
  isStarted: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
  stopGame: () => void
}

export function Game({
  getField,
  setField,
  disabled,
  isStarted,
  setDisabled,
  reset,
  stopGame
}: GameProps) {
  const myField = getField(true);
  const enemyField = getField(false);
  const [countToWin, setCountToWin] = useState(3);
  const [countToLose, setCountToLose] = useState(3);
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
      setCountToLose(c => c - 1)
      simulateClick(false);
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
      setCountToWin(c => c - 1)
      setDisabled(false);
    } else {
      setDisabled(true);
      simulateClick(false);
    }
  };

  useEffect(() => {
    if(countToLose === 0 || countToWin === 0){
      setOpen(true)
      stopGame()
    }
  }, [countToLose, countToWin])

  return (
    <div className={styles.app}>
      <Field
        field={myField}
        isMyStep={false}
        makeShoot={shoot}
        isEnemyField={false}
        setField={setField(true)}
      />
      <DissableWrapper
        style={{ padding: "0px", marginTop: "20px" }}
        disabled={disabled || isStarted}
      >
        <Field
          field={enemyField}
          isMyStep={!disabled}
          makeShoot={shoot}
          isEnemyField
          setField={setField(false)}
        />
      </DissableWrapper>
      <button onClick={() => setOpen(true)}>
        test
      </button>
      <Modal open={open} setOpen={setOpen}>
        {countToWin === 0
          ? "Ура вы победили!"
          : countToLose === 0
          ? "Увы вы проиграли"
          : "test"}
      </Modal>
    </div>
  );
}
