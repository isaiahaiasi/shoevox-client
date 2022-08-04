interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

};

export default function Button(props: ButtonProps) {
  return (
    <button {...props} >{props.children}</button>
  )
}
