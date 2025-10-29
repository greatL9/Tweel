function Comment({ comment, id }: { comment: string; id: string }) {
  return (
    <div>
      {comment}
      {id}
    </div>
  );
}

export default Comment;
