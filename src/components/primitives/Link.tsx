import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

interface LinkProps extends RouterLinkProps { }

const defaultLinkStyle = 'underline text-blue-600 hover:text-blue-800 visited:text-black';

export default function Link({ ...props }: LinkProps) {
  return (
    <RouterLink className={defaultLinkStyle} {...props}>
      {props.children}
    </RouterLink>
  );
}
