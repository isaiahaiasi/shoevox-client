import { getQueryKey, useMutationOperation } from '../hooks/useFetch';
import { Button } from './Primitives';

interface LikeButtonProps {
  roomId: string;
}

export default function LikeButton({ roomId }: LikeButtonProps) {
  const reqData = {
    params: {
      roomid: roomId,
    },
    body: {},
    query: {},
  };

  const { mutate } = useMutationOperation(
    'createLike',
    [
      getQueryKey('getRoomById', reqData),
      getQueryKey('getLikesByRoomId', reqData),
    ],
  );

  return (
    <Button onClick={() => mutate(reqData)}>Like Room!</Button>
  );
}
