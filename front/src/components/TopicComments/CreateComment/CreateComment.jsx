import React, { useState } from 'react';
import { Divider, Grid, Input } from 'semantic-ui-react';
import { createComment } from '../../../api/forumApi';

const CreateComment = ({
  auth,
  fetchComments,
  setLoading,
  userId,
  authorPic,
  authorName,
  topicId,
}) => {
  const [commentContent, setCommentContent] = useState('');

  const handleContentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const onCommentCreate = async (event) => {
    try {
      setLoading(true);
      const newComment = {
        content: commentContent,
        userId,
        authorPic,
        authorName,
      };
      await createComment(auth.getIdToken(), topicId, newComment);
      fetchComments();
    } catch {
      alert('Topic creation failed');
    }
  };

  return (
    <Grid.Row key="newComment">
      <Grid.Column width={16}>
        <Input
          action={{
            color: 'teal',
            labelPosition: 'left',
            icon: 'add',
            content: 'New comment',
            onClick: onCommentCreate,
          }}
          fluid
          actionPosition="left"
          placeholder="Add your comment"
          onChange={handleContentChange}
        />
      </Grid.Column>
      <Grid.Column width={16}>
        <Divider />
      </Grid.Column>
    </Grid.Row>
  );
};

export default CreateComment;
