interface StackProps {
  children: React.ReactNode;
}

export default function Stack({ children }: StackProps) {
  return (
    <div className="flex flex-col gap-2">{children}</div>
  );
}
