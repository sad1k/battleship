import { useCallback, useEffect, useRef, useState } from "react";
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
  const [countToWin, setCountToWin] = useState(3);
  const [countToLose, setCountToLose] = useState(3);
  const [bot, setBot] = useState({
    botTimerRef: useRef(-1),
    endTimeForShoot: -1,
    restTime: -1,
  });

  const setField = useCallback((user: boolean) => {
    if (user) {
      return setMyField;
    } else {
      return setEnemyField;
    }
  }, [])

  const initFields = () => {
    setMyField(() => createField());
    setEnemyField(() => createField());
  };

  const startGame = () => {
    if (isStarted) {
      initFields();
      clearIntervals();
      startTimer();
    }
    setDisabled(false);
    setIsStarted(true);
  };

  const getField = useCallback((user: boolean) => {
    if (user) {
      return myField;
    } else {
      return enemyField;
    }
  }, [enemyField, myField])

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

  const simulateClick = useCallback(
    (user: boolean, time: number = 1000) => {
      const [x, y] = getRandomIds(user ? enemyField : myField)
        .split("-")
        .map(Number);
      const cell = document.querySelectorAll(`div[id='${x}-${y}']`)[
        user ? 1 : 0
      ];
      const ref = makeEvent(cell, user, time);
      if (ref) {
        bot.botTimerRef.current = ref;
        setBot((bot) => ({
          ...bot,
          endTimeForShoot: Date.now() + 1000,
        }));
      }
    },
    [bot.botTimerRef, enemyField, myField]
  );
  
  const clearIntervals = useCallback(() => {
    clearInterval(timerRef.current);
    clearInterval(bot.botTimerRef.current);
  }, [bot.botTimerRef]);

  const handleResetField = useCallback(() => {
    setIsStarted(false);
    setPaused(false);
    clearIntervals();
    initFields();
    setCountToLose(3);
    setCountToWin(3);
  }, [clearIntervals])

  const reset = useCallback(() => {
    clearInterval(timerRef.current);
    startTimer(TIMEFORSTEP, () => {
      simulateClick(true);
      reset();
    });
  }, [simulateClick]);

  const pauseGame = () => {
    if (isStarted) {
      setPaused(true);
      if (bot.endTimeForShoot != -1) {
        setBot((bot) => ({
          ...bot,
          restTime: Date.now() - bot.endTimeForShoot,
        }));
      }
      clearIntervals();
    }
  };

  const continueGame = () => {
    setPaused(false);
    if (disabled) {
      simulateClick(false, bot.restTime);
    } else {
      startTimer(timeLeft, () => {
        simulateClick(true);
        reset();
      });
    }
  };


  const stopGame = useCallback(() => {
    setIsStarted(false);
    setPaused(false);
    setDisabled(true);
    clearIntervals();
    initFields();
  }, [clearIntervals]);

  return (
    <div className={styles.root}>
      <div className={styles.app}>
        <ButtonsBar
          isStarted={isStarted}
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
          <DissableWrapper disabled={!isStarted || paused}>
            <Game
              isStarted={paused}
              setField={setField}
              getField={getField}
              disabled={disabled}
              setCountToWin={setCountToWin}
              setCountToLose={setCountToLose}
              countToLose={countToLose}
              countToWin={countToWin}
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
