import { Button } from "../Button/Button";
import { useState } from "react";

interface ButtonProps {
  startGame: () => void;
  restartGame: () => void;
  pauseGame: () => void;
  continueGame: () => void;
  paused: boolean;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonsBar = ({
  startGame,
  restartGame,
  continueGame,
  paused,
  setPaused,
  pauseGame,
}: ButtonProps) => {
  const [disabledFirst, setDisabledFirst] = useState(false);
  const [disabledThird, setDisabledThird] = useState(true);

  return (
    <div className="buttonsPanel">
      <Button
        disabled={disabledFirst}
        onClick={() => {
          startGame();
          setDisabledThird(false);
          setDisabledFirst(true);
        }}
      >
        Начать игру
      </Button>
      <Button onClick={restartGame}>Перезагрузить поле</Button>
      {paused ? (
        <Button
          onClick={() => {
            setPaused(false)
            continueGame();
          }}
        >
          Продолжить
        </Button>
      ) : (
        <Button
          disabled={disabledThird}
          onClick={() => {
            pauseGame();
            setPaused(true);
          }}
        >
          Пауза
        </Button>
      )}
    </div>
  );
};
