import { Button } from "../Button/Button";

interface ButtonProps {
  startGame: () => void;
  restartGame: () => void;
  pauseGame: () => void;
  continueGame: () => void;
  paused: boolean;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
  isStarted: boolean
}

export const ButtonsBar = ({
  startGame,
  restartGame,
  continueGame,
  paused,
  setPaused,
  isStarted,
  pauseGame,
}: ButtonProps) => {

  return (
    <div className="buttonsPanel">
      <Button
        onClick={() => {
          startGame();
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
          disabled={!isStarted}
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
