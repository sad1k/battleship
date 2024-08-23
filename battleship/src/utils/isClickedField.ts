import { CellStatus } from "../components/Cell";

export const isClickedField = (field: CellStatus[][], x: number, y: number) => {
  if ([CellStatus.Hitted, CellStatus.Miss].includes(field[y][x])) {
    return true;
  }
  return false;
};
