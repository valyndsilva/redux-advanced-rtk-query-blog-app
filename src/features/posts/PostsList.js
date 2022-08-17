import { useSelector } from 'react-redux';
// After createEntityAdapter changes:
import { selectPostIds } from './postsSlice';
import PostsExcerpt from './PostsExcerpt';
import { useGetPostsQuery } from './postsSlice';

export default function PostsList() {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();

  const orderedPostIds = useSelector(selectPostIds);

  let renderedPosts;

  if (isLoading) {
    renderedPosts = <p>"Loading..."</p>;
  } else if (isSuccess) {
    renderedPosts = orderedPostIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (isError) {
    renderedPosts = <p>{error}</p>;
  }

  return (
    <section>
      {/* <h2>Posts</h2> */}
      {renderedPosts}
    </section>
  );
}
