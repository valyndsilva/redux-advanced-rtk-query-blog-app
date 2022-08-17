import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { useAddNewPostMutation } from './postsSlice';

export default function AddPostsForm() {
  // const dispatch = useDispatch();
  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');
  // const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onBodyChanged = (e) => setBody(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  // const canSave = Boolean(title) && Boolean(body) && Boolean(userId);
  // const canSave =
  //   [title, body, userId].every(Boolean) && addRequestStatus === 'idle';
  const canSave = [title, body, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        // setAddRequestStatus('pending');
        // dispatch(addNewPost({ title, body, userId })).unwrap();
        await addNewPost({ title, body, userId }).unwrap();

        setTitle('');
        setBody('');
        setUserId('');
        navigate('/');
      } catch (err) {
        console.error('Failed to save the post', err);
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postBody">Content:</label>
        <textarea
          id="postBody"
          name="postBody"
          value={body}
          onChange={onBodyChanged}
        />
        {/* <button type="button" onClick={onSavePostClicked}> */}
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
}
