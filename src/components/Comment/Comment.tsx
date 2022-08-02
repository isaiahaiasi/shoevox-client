import { Dto } from '@isaiahaiasi/voxelatlas-spec';
import { Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface CommentProps {
  comment: Dto['Comment'];
}

export default function Comment({ comment }: CommentProps) {
  const { content, user, createdAt } = comment;

  return (
    <Paper>
      <Typography variant="body1">{content}</Typography>
      <Typography variant="caption">posted by <Link to={`/u/${user.id}`}>{user.username}</Link> on {createdAt}</Typography>
    </Paper>
  );
}
