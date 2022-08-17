import useAuth from '../hooks/useAuth';
import { getQueryKey, useMutationOperation, useQueryOperation } from '../hooks/useFetch';
import { Button } from './Primitives';

interface LikeButtonProps {
  roomId: string;
}

interface RemoveLikeButtonProps {
  roomId: string;
  likeId: string;
}

const baseReqData = {
  body: {},
  params: {},
  query: {},
};

function AddLikeButton({ roomId }: LikeButtonProps) {
  const createLikeReqData = {
    ...baseReqData,
    params: {
      roomid: roomId,
    },
  };

  const { mutate } = useMutationOperation(
    'createLike',
    [
      ['getLike'],
      getQueryKey('getRoomById', createLikeReqData),
      getQueryKey('getLikesByRoomId', createLikeReqData),
    ],
  );

  return (
    <Button
      onClick={() => mutate(createLikeReqData)}
    >
      Like Room!
    </Button>
  );
}

function RemoveLikeButton({ likeId, roomId }: RemoveLikeButtonProps) {
  const deleteLikeReqData = {
    ...baseReqData,
    params: {
      likeid: likeId,
    },
  };

  const dependentReqData = {
    ...baseReqData,
    params: {
      roomid: roomId,
    },
  };

  const { mutate } = useMutationOperation(
    'deleteLike',
    [
      ['getLike'], // Don't really want to pass getLikeReqData just for this...
      getQueryKey('getRoomById', dependentReqData),
      getQueryKey('getLikesByRoomId', dependentReqData),
    ],
  );

  return (
    <Button
      onClick={() => mutate(deleteLikeReqData)}
    >
      Unlike Room!
    </Button>
  );
}

export default function LikeButton({ roomId }: LikeButtonProps) {
  const { user } = useAuth();

  if (!user) {
    throw new Error('No user found, but route requires authentication.');
  }

  const getLikeReqData = {
    ...baseReqData,
    params: {
      roomid: roomId,
      userid: user.id,
    },
  };

  // Using this query is a little goofy, because the "expected" result is 404...
  const { data } = useQueryOperation('getLike', getLikeReqData);

  const alreadyLiked = !!(data?.data);

  return alreadyLiked
    ? <RemoveLikeButton likeId={data.data.id} roomId={roomId} />
    : <AddLikeButton roomId={roomId} />;
}
