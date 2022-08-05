interface ErrorProps {
  title?: string;
  content?: string;
}

export default function ErrorAlert({ title, content }: ErrorProps) {
  return (
    <div>
      <div>{title ?? 'Error'}</div>
      {content ?? 'Something went wrong!'}
    </div>
  );
}
