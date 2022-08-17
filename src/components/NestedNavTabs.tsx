import { NavLink, Outlet, To } from 'react-router-dom';
import { Header } from './Primitives/Typography';

interface NestedNavTabsProps {
  tabs: {
    to: To;
    text: string;
  }[]
}

export default function NestedNavTabs({ tabs }: NestedNavTabsProps) {
  return (
    <>
      <nav className="flex gap-4 pb-4">
        {tabs.map(({ to, text }) => (
          <Header level={3} key={text}>
            <NavLink
              to={to}
              end={to === ''}
              className={({ isActive }) => (isActive ? 'underline' : undefined)}
            >
              {text}
            </NavLink>
          </Header>
        ))}
      </nav>
      <Outlet />
    </>
  );
}
