import styles from './typography.module.scss';

interface ChildProp {
  children: React.ReactNode;
}

interface HeaderProps extends ChildProp {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Caption({ children }: ChildProp) {
  return (
    <div className={styles.caption}>{children}</div>
  );
}

export function Body({ children }: ChildProp) {
  return (
    <div className={styles.body}>{children}</div>
  );
}

export function Header({ children, level }: HeaderProps) {
  switch (level) {
    case 2: return <h2 className={styles.h2}>{children}</h2>;
    case 3: return <h3 className={styles.h3}>{children}</h3>;
    case 4: return <h4 className={styles.h4}>{children}</h4>;
    case 5: return <h5 className={styles.h5}>{children}</h5>;
    case 6: return <h6 className={styles.h6}>{children}</h6>;
    default: return <h1 className={styles.h1}>{children}</h1>;
  }
}

const Typography = {
  Caption,
  Body,
  Header,
};

export default Typography;
