import { FormEventHandler } from 'react';
import { getQueryKey, useMutationOperation } from '../../hooks/useFetch';
import { Button, Input } from '../Primitives';

interface CommentFormProps {
  roomId: string;
}

export default function CommentForm({ roomId }: CommentFormProps) {
  const { mutate } = useMutationOperation(
    'createComment',
    [getQueryKey('getCommentsByRoomId', { params: { roomid: roomId } })],
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const reqData = {
      params: { roomid: roomId },
      body: { content: e.currentTarget.content.value as string },
      query: {},
    };

    e.currentTarget.content.value = '';

    return mutate(reqData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-4 gap-2">
      <Input.Text
        name="content"
        placeholder="Add your comment"
        id="content"
        className="flex-1"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
