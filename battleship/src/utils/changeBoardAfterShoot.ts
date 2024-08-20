import { CellStatus } from "../components/Cell";

export const changeBoardAfterShoot = (
  field: CellStatus[][],
  x: number,
  y: number,
  isHit: boolean
) => {
  if (isHit) {
    field[y][x] = CellStatus.Hitted;
  } else {
    field[y][x] = CellStatus.Miss;
  }
};