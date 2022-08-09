type ButtonVariant = 'contained' | 'outlined';

type ButtonStyles = { [key in ButtonVariant | 'disabled' | 'base']: string };

interface ButtonProps extends
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: ButtonVariant;
}

const buttonStyles: ButtonStyles = {
  base: 'py-2 px-4 rounded',
  disabled: 'bg-blue-500 text-white font-bold opacity-50 cursor-not-allowed',
  contained: 'bg-blue-500 hover:bg-blue-700 text-white font-bold',
  outlined: 'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent',
};

export default function Button({ variant = 'contained', className: outerClassName, ...props }: ButtonProps) {
  const style = props.disabled ? 'disabled' : variant;

  return (
    // TODO: address linting issues
    // eslint-disable-next-line max-len
    // eslint-disable-next-line react/button-has-type, react/destructuring-assignment, react/jsx-props-no-spreading
    <button {...props} className={`${buttonStyles.base} ${buttonStyles[style]}`}>{props.children}</button>
  );
}
