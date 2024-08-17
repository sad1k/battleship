interface IProps{
  isStarted: boolean
  disabled: boolean
}

export const Title = ({isStarted, disabled}: IProps) => {
  return (
    <>
      <h1>Battleship</h1>
      {isStarted ? (
        <div>{disabled ? <h1>Ход противника</h1> : <h1>Твой ход</h1>}</div>
      ) : (
        <div>
          <h1>Игра не началась</h1>
        </div>
      )}
    </>
  );
};
