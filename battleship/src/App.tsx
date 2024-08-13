import "./App.css";
import { Button } from "./components/Button/Button";
import styles from "./Battleship.module.css";
import { useRef, useState } from "react";
import { Field } from "./components/Field/Field";
import { EnemyField } from "./components/EnemyField/EnemyField";

const TIMEFORSTEP = 5000;

function App() {
  const [isStopped, setIsStopped] = useState(false);
  const [timeLeft, setTimeleft] = useState(0);
  const timerRef = useRef(-1);

  const startTimer = (initialTime = TIMEFORSTEP) => {
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const timePassed = Date.now() - startTime;
      if (timePassed > initialTime) {
        setTimeleft(0);
        clearInterval(timerRef.current);
      } else {
        setTimeleft(initialTime - timePassed);
      }
    }, 0);
  };

  const stopTimer = () => {
    if (isStopped) {
      startTimer(timeLeft);
    } else {
      clearInterval(timerRef.current);
    }
    setIsStopped((prev) => !prev);
  };

  return (
    <div className={styles.app}>
      <h1>Battleship</h1>
      <div className="buttonsPanel">
        <Button onClick={() => startTimer()}>Начать игру</Button>
        <Button>Перезагрузить поле</Button>
        <Button onClick={() => stopTimer()}>Пауза</Button>
      </div>
      <div className={styles.timer}>
        <span>{`${Math.floor(timeLeft / 1000)} сек :${
          timeLeft % 1000
        } мс`}</span>
      </div>
      <Field />
      <EnemyField />
    </div>
  );
}

export default App;
