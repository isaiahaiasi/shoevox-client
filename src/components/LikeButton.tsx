import useAuth from '../hooks/useAuth';
import { getQueryKey, useMutationOperation, useQueryOperation } from '../hooks/useFetch';
import { Button } from './Primitives';

interface LikeButtonProps {
  roomId: string;
}

interface RemoveLikeButtonProps {
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

function RemoveLikeButton({ likeId }: RemoveLikeButtonProps) {
  const deleteLikeReqData = {
    ...baseReqData,
    params: {
      likeid: likeId,
    },
  };

  const { mutate } = useMutationOperation(
    'deleteLike',
    [
      ['getLike'], // Don't really want to pass getLikeReqData just for this...
      getQueryKey('getRoomById', deleteLikeReqData),
      getQueryKey('getLikesByRoomId', deleteLikeReqData),
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

// TODO: CURRENTLY BROKEN
// If getLike 404s, that breaks everything!!!
// I don't really know what to do about that???
// I might need to rewrite all of my response types to handle non-200 responses...
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

  const { data } = useQueryOperation('getLike', getLikeReqData);

  const alreadyLiked = !!(data?.data);

  return alreadyLiked
    ? <RemoveLikeButton likeId={data.data.id} />
    : <AddLikeButton roomId={roomId} />;
}
