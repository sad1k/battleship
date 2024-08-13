import { ReactHTMLElement, useEffect, useState } from "react";
import styles from "../../Battleship.module.css"
import { createField, makeEmptyField } from "../../utils/createField";

export const Field = ({isEnemyField, field, ...props}: {isEnemyField?: boolean, field: number[][]} & ReactHTMLElement<HTMLDivElement>) => {
  const [grid, setGrid] = useState(field ? field : makeEmptyField())

  return (
    <div {...props} className={styles.battleship}>
        {grid.map((row, index1) => {
          return (
            <div  className={styles.battleshipRow}>
              {row.map((field, index2) => { //Заюзать библиотеку classnames
                return <div id={`${index2}-${index1}`} className={(isEnemyField ? styles.enemyField : field === 1 ? styles.battleFieldMarked : field === 4 ? styles.hitField : styles.battleField)}></div>
              })}
            </div>
          )
        })}
    </div>
  )
}