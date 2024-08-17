import styles from "../../Battleship.module.css";


export const Button = ({children, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {

  return <button className={styles.btn} {...props}>{children}</button>
}