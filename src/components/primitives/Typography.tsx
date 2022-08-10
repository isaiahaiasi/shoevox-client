interface ChildProp {
  children: React.ReactNode;
}

interface HeaderProps extends ChildProp {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Caption({ children }: ChildProp) {
  return (
    <div className="text-sm font-light italic text-neutral-600">{children}</div>
  );
}

export function Body({ children }: ChildProp) {
  return (
    <div className="text-base">{children}</div>
  );
}

export function Header({ children, level }: HeaderProps) {
  switch (level) {
    case 2: return <h2 className="text-2xl font-bold">{children}</h2>;
    case 3: return <h3 className="text-xl">{children}</h3>;
    case 4: return <h4 className="text-lg">{children}</h4>;
    case 5: return <h5 className="text-base">{children}</h5>;
    case 6: return <h6 className="text-sm">{children}</h6>;
    case 1:
    default: return <h1 className="text-3xl font-bold">{children}</h1>;
  }
}

const Typography = {
  Caption,
  Body,
  Header,
};

export default Typography;
