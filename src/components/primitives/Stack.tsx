import style from './stack.module.scss';

interface StackProps {
  children: React.ReactNode;
}

export default function Stack({ children }: StackProps) {
  return (
    <div className={style.stack}>{children}</div>
  )
}
