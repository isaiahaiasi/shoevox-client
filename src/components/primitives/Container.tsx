interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  const classes = ['px-2 w-full max-w-prose mx-auto columns-1', className ?? ''].join(' ');
  return (
    <div className={classes}>
      {children}
    </div>
  );
}
