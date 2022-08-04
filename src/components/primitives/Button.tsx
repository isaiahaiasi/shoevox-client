interface ButtonProps extends
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}

export default function Button(props: ButtonProps) {
  return (
    // TODO: address linting issues
    // eslint-disable-next-line max-len
    // eslint-disable-next-line react/button-has-type, react/destructuring-assignment, react/jsx-props-no-spreading
    <button {...props}>{props.children}</button>
  );
}
