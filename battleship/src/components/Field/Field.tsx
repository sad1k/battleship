import { useEffect, useState } from "react";
import styles from "../../Battleship.module.css"

export const Field = ({isEnemyField, ...props}: {isEnemyField?: boolean}) => {
  const [grid, setGrid] = useState(Array.from({ length: 5 }, () =>
    Array.from({ length: 5 }, () => 0)
  ))

  useEffect(() => {
    createField()
  }, [])

  const createField = () => {
    const field = structuredClone(grid)
    const taken = new Set();
    while (taken.size < 3) {
      const x = Math.floor(Math.random() * 5);
      const y = Math.floor(Math.random() * 5);
      const id = `${x} ${y}`;
      taken.add(id);
      field[x][y] = 1;
    }
    setGrid(field)
  };

  return (
    <div {...props} className={styles.battleship}>
        {grid.map((row, index1) => {
          return (
            <div className={styles.battleshipRow}>
              {row.map((field, index2) => { 
                return <div key={index1 + index2} className={(field ? styles.battleFieldMarked : styles.battleField) + (isEnemyField ? " " + styles.enemyField : "")}></div>
              })}
            </div>
          )
        })}
      </div>
  )
}