import { Comment } from '@/types';
import { getDateDiff } from '@/libs/getDateDiff';

const CommentList = ({ comments }: { comments: Comment[] }) => {
  return (
    <ul className='mb-32'>
      {comments.reverse().map(comment => (
        <li key={comment.rid} className='py-8 flex flex-col gap-4 border-b'>
          <div className='flex gap-2'>
            <p className='font-bold'>{comment.nickname}</p>
            <p>{getDateDiff(comment.regDate)}</p>
          </div>

          <p className='whitespace-pre-wrap break-words'>{comment.text}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
