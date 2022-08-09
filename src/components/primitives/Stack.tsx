interface StackProps {
  children: React.ReactNode;
}

export default function Stack({ children }: StackProps) {
  return (
    <div className="">{children}</div>
  );
}
