interface ButtonProps extends
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: 'Contained' | 'Outlined';
}

export default function Button({ variant = 'Contained', className: outerClassName, ...props }: ButtonProps) {
  const className = [
    outerClassName ?? '',
    // styles.button,
    // styles[`variant${variant}`],
  ].join(' ');

  return (
    // TODO: address linting issues
    // eslint-disable-next-line max-len
    // eslint-disable-next-line react/button-has-type, react/destructuring-assignment, react/jsx-props-no-spreading
    <button {...props} className={className}>{props.children}</button>
  );
}
