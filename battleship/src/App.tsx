import "./App.css";
import { Button } from "./components/Button/Button";
import styles from "./Battleship.module.css";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { Field } from "./components/Field/Field";
import { createField, getRandomIds } from "./utils/createField";

const TIMEFORSTEP = 5000;

function App() {
  const [isStopped, setIsStopped] = useState(false);
  const [timeLeft, setTimeleft] = useState(0);
  const timerRef = useRef(-1);
  const [myField, setMyField] = useState<number[][]>(() => createField());
  const [enemyField, setEnemyField] = useState(() => createField());
  const [disabled, setDisabled] = useState(true);
  const [countToWin, setCountToWin] = useState(3);
  const [countToLose, setCountToLose] = useState(3);
  const startGame = () => {
    setDisabled(false);
    startTimer(TIMEFORSTEP, () => {
      const [x, y] = getRandomIds(myField).split('-')
      handleTimeExpired([+x, +y]);
    });
  };

  const startTimer = (initialTime = TIMEFORSTEP, callback?: () => void) => {
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const timePassed = Date.now() - startTime;
      if (timePassed > initialTime) {
        clearInterval(timerRef.current);
        setTimeleft(0);
        if (callback) callback();

      } else {
        setTimeleft(initialTime - timePassed);
      }
    }, 0);
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);
  const handleTimeExpired = (coordinats: [number, number]) => {
    const [x, y] = coordinats;
    const field = document.querySelectorAll(`div[id='${x}-${y}']`)[1];
    console.log(field);
    if (enemyField[y][x] === 1) {
      setCountToWin((prev) => prev - 1);
      field?.classList.add(styles.hitField);
    } else {
      field?.classList.add(styles.missField);
    }
    enemyField[x][y] = 3;
    setDisabled(true);
    handleClickBot();
  };

  const stopTimer = () => {
    if (isStopped) {
      startTimer(timeLeft, () => {
        const x = Math.floor(Math.random() * 5);
        const y = Math.floor(Math.random() * 5);
        handleTimeExpired([x, y]);
      });
    } else {
      clearInterval(timerRef.current);
    }
    setIsStopped((prev) => !prev);
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const [x, y]: string[] = target.id.split("-");
    
    if (enemyField[+y][+x] === 1) {
      setCountToWin((prev) => prev - 1);
      target.classList.add(styles.hitField);
    } else {
      target.classList.add(styles.missField);
    }
    enemyField[+y][+x] = 3;
    clearInterval(timerRef.current);
    setDisabled(true);
    handleClickBot();
  };

  const handleReset = () => {
    clearInterval(timerRef.current)
    setTimeleft(0)
    setDisabled(true)
    setMyField(() => createField())
    console.log('123')
  }

  const handleClickBot = () => {
    const randTime = Math.floor(Math.random() * TIMEFORSTEP);
    startTimer(TIMEFORSTEP);
    setTimeout(() => {
      const [x, y] = getRandomIds(myField).split("-");
      const field = document.getElementById(`${x}-${y}`);
      if (myField[+y][+x] === 1) {
        console.log("aboba");
        setCountToLose((prev) => prev - 1);
        field?.classList.add(styles.hitField);
        myField[+y][+x] = 4;
      } else {
        myField[+y][+x] = 3;
        field?.classList.add(styles.missField);
      }
      clearInterval(timerRef.current);
      startTimer(TIMEFORSTEP, () => {
        const x = Math.floor(Math.random() * 5);
        const y = Math.floor(Math.random() * 5);
        handleTimeExpired([x, y]);
      });
      setDisabled(false);
    }, randTime);
  };

  if (countToWin === 0) {
    clearInterval(timerRef.current);
    return <h1>Ура победа</h1>;
  }

  if (countToLose === 0) {
    clearInterval(timerRef.current);
    return <h1>Ура проеб</h1>;
  }

  return (
    <div className={styles.app}>
      <h1>Battleship</h1>
      <div className="buttonsPanel">
        <Button onClick={() => startGame()}>Начать игру</Button>
        <Button onClick={handleReset}>Перезагрузить поле</Button>
        <Button onClick={() => stopTimer()}>Пауза</Button>
      </div>
      <div className={styles.timer}>
        <span>{`${Math.floor(timeLeft / 1000)} сек :${
          timeLeft % 1000
        } мс`}</span>
      </div>
      <div>{disabled ? <h1>Ход противника</h1> : <h1>Твой ход</h1>}</div>
      <Field field={myField} />
      <button disabled={disabled} className={disabled ? styles.disabled : ""}>
        <Field field={enemyField} onClick={handleClick} isEnemyField />
      </button>
    </div>
  );
}

export default App;
