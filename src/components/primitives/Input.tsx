/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line max-len
type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function Text(props: InputProps) {
  const overrideClassName = props.className ?? '';

  return (
    <input
      {...props}
      type="text"
      className={`text-black py-2 px-4 rounded ${overrideClassName}`}
    />
  );
}

export default {
  Text,
};
