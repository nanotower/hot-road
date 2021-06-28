import React from 'react';
import moment from 'moment';
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

const Comment = ({ comment }) => {
  const creationDate = moment(comment.createdAt).format('MMM Do YY');
  const author = JSON.parse(comment.author);

  return (
    <Grid.Row key={comment.topicId}>
      <Grid.Column width={9} verticalAlign="middle">
        {comment.content}
      </Grid.Column>
      <Grid.Column width={3} verticalAlign="middle">
        <div>
          <Image src={author.authorPic} avatar />
          <span>{author.authorName}</span>
        </div>
      </Grid.Column>
      <Grid.Column width={3} verticalAlign="middle">
        {creationDate}
      </Grid.Column>
      <Grid.Column width={16}>
        <Divider />
      </Grid.Column>
    </Grid.Row>
  );
};

export default Comment;
