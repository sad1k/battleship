

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  
}

export const Button = ({children, ...props}: ButtonProps): JSX.Element => {

  return <button {...props}>{children}</button>
}