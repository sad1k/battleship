import { useEffect, useRef, useState } from "react";
import { Game } from "./components/Game/Game";
import { TIMEFORSTEP, Timer } from "./components/Timer/Timer";
import { createField, getRandomIds } from "./utils/createField";
import { makeEvent } from "./utils/makeEvent";
import { ButtonsBar } from "./components/ButtonsBar/ButtonsBar";
import { DissableWrapper } from "./components/DisableWrapper/DissableWrapper";
import styles from "./Battleship.module.css";
import { Title } from "./components/Title/Title";

export const ISBOT = "isbot";

function App() {
  const [timeLeft, setTimeleft] = useState(0);
  const timerRef = useRef(-1);
  const [myField, setMyField] = useState(() => createField());
  const [enemyField, setEnemyField] = useState(() => createField());
  const [isStarted, setIsStarted] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [paused, setPaused] = useState(false);
  const [bot, setBot] = useState({
    botTimerRef: -1,
    endTimeForShoot: -1,
    restTime: -1,
  });

  const setField = (user: boolean) => {
    if (user) {
      return setMyField;
    } else {
      return setEnemyField;
    }
  };

  const startGame = () => {
    setDisabled(false);
    setIsStarted(true);
  };

  const getField = (user: boolean) => {
    if (user) {
      return myField;
    } else {
      return enemyField;
    }
  };
  console.log("render");
  useEffect(() => {
    if (isStarted) {
      reset();
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, [isStarted, disabled]);

  const startTimer = (initialTime = TIMEFORSTEP, callback?: () => void) => {
    const startTime = Date.now();
    console.log(initialTime);
    timerRef.current = setInterval(() => {
      const timePassed = Date.now() - startTime;
      if (timePassed > initialTime) {
        clearInterval(timerRef.current);
        setTimeleft(0);
        if (callback) callback();
      } else {
        setTimeleft(initialTime - timePassed);
      }
    }, 16);
  };

  const simulateClick = (user: boolean, time: number = 1000) => {
    const [x, y] = getRandomIds(user ? enemyField : myField)
      .split("-")
      .map(Number);
    const cell = document.querySelectorAll(`div[id='${x}-${y}']`)[user ? 1 : 0];
    const ref = makeEvent(cell, user, time);
    if (ref) {
      setBot((bot) => ({
        ...bot,
        botTimerRef: ref,
        endTimeForShoot: Date.now() + 1000,
      }));
    }
    reset();
  };

  const handleResetField = () => {
    setIsStarted(false);
    setPaused(false);
    console.log('aboba')
    setMyField(() => createField());
    setEnemyField(() => createField());
    if (isStarted) {
      startGame()
    }
  };

  const handleTimeExpired = () => {
    simulateClick(true);
  };

  const reset = () => {
    clearInterval(timerRef.current);
    startTimer(TIMEFORSTEP, () => {
      handleTimeExpired();
    });
  };

  const pauseGame = () => {
    if (isStarted) {
      setPaused(true);
      if (bot.endTimeForShoot != -1) {
        setBot((bot) => ({
          ...bot,
          restTime: Date.now() - bot.endTimeForShoot,
        }));
      }
      clearIntervals()
    }
  };
  const continueGame = () => {
    setPaused(false);
    if (disabled) {
      simulateClick(false, bot.restTime);
    } else {
      console.log(timeLeft);
      startTimer(timeLeft, () => {
        handleTimeExpired();
      });
    }
  };

  const clearIntervals = () => {
    clearInterval(timerRef.current)
    clearInterval(bot.botTimerRef)
  }

  const stopGame = () => {
    clearIntervals()
    setIsStarted(false)
    setDisabled(true)
  }
  
  return (
    <div className={styles.root}>
      <div className={styles.app}>
        <ButtonsBar
          startGame={startGame}
          pauseGame={pauseGame}
          continueGame={continueGame}
          restartGame={handleResetField}
          paused={paused}
          setPaused={setPaused}
        />
        <Timer timeLeft={timeLeft} />
        <Title isStarted={isStarted} disabled={disabled} />
        <div>
          <DissableWrapper disabled={paused}>
            <Game
              isStarted={paused}
              setField={setField}
              getField={getField}
              disabled={disabled}
              reset={reset}
              setDisabled={setDisabled}
              stopGame={stopGame}
            />
          </DissableWrapper>
        </div>
      </div>
    </div>
  );
}

export default App;
