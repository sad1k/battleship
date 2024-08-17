import { CellStatus } from "../components/Cell";

export const makeEmptyField = () =>
  Array.from({ length: 5 }, () =>
    Array.from({ length: 5 }, () => CellStatus.Empty)
  );

const isValidField = (field: string, fields: Set<string>) => {
  const [x, y]: number[] = field.split(" ").map(Number);
  for (const val of fields.values()) {
    const [fieldX, fieldY]: number[] = val.split(" ").map(Number);
    if (Math.abs(x - fieldX) < 2 && Math.abs(fieldY - y) < 2) {
      return false
    }
  }
  return true;
};

export const createField = (): CellStatus[][] => {
  const grid = makeEmptyField();
  const taken: Set<string> = new Set();
  while (taken.size < 3) {
    const x = Math.floor(Math.random() * 5);
    const y = Math.floor(Math.random() * 5);
    const id = `${x} ${y}`;
    if (isValidField(id, taken)) {
      taken.add(id);
      grid[y][x] = CellStatus.Ship;
    } else {
      continue;
    }
  }
  return grid;
};

export const getRandomIds = (field: number[][]): string => {
  const emptyFields: string[] = [];
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[0].length; j++) {
      if (field[i][j] === CellStatus.Empty || field[i][j] === CellStatus.Ship) {
        emptyFields.push(`${j}-${i}`);
      }
    }
  }
  return emptyFields[Math.floor(Math.random() * emptyFields.length)];
};
