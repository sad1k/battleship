export const makeEmptyField = () => Array.from({ length: 5 }, () =>
  Array.from({ length: 5 }, () => 0))


export const createField = () => {
  const grid = makeEmptyField()
  const taken = new Set();
  while (taken.size < 3) {
    const x = Math.floor(Math.random() * 5);
    const y = Math.floor(Math.random() * 5);
    const id = `${x} ${y}`;
    taken.add(id);
    grid[y][x] = 1;
  }
  return grid
};


export const getRandomIds = (field: number[][]): string => {
  const emptyFields: string[] = []
  for(let i = 0; i < field.length; i++){
    for(let j = 0; j < field[0].length; j++){
      if(field[i][j] !== 3){
        emptyFields.push(`${j}-${i}`)
      }
    }
  }
  return emptyFields[Math.floor(Math.random() * emptyFields.length)]
}