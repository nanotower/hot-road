import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader,
} from 'semantic-ui-react';
import styles from './TopicComments.module.css';
import Comment from './Comment/Comment';
import { getComments } from '../../api/forumApi';

const TopicComments = ({ auth, history, topic }) => {
  const [comments, setcomments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetchComments();
    } catch (error) {
      alert(`Failed to fetch comments: ${error.message}`);
    }
  }, []);

  const fetchComments = async () => {
    const comments = await getComments(auth.getIdToken(), topic.topicId);
    setcomments(comments);
    setLoading(false);
  };

  const commentsList = () => 
      loading? 
      <Loader indeterminate active inline="centered">
        Loading Comments
      </Loader>
      :
      <div>
         <Grid padded>
          {comments.map((comment, pos) => (
            <Comment comment={comment} pos={pos} />
          ))}
        </Grid> 
      </div>
  

  return (
  <div>
      <Header as="h1" className={styles.title}>
          {topic.title}
      </Header>
      {commentsList()}
  </div>);
};

export default TopicComments;
