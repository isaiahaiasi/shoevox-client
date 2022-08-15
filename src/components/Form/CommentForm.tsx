import { FormEventHandler, useState } from 'react';
import { useMutationOperation } from '../../hooks/useFetch';
import { Button } from '../Primitives';

interface CommentFormProps {
  roomId: string;
}

export default function CommentForm({ roomId }: CommentFormProps) {
  const { mutate } = useMutationOperation('createComment');
  const [content, setContent] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const reqData = {
      params: { roomid: roomId },
      body: { content: e.currentTarget.content.value as string },
      query: {},
    };

    return mutate(reqData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="content"
        id="content"
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
        className="text-black"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
