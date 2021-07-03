import React from 'react';
import moment from 'moment';

import { Button, Divider, Grid, Icon } from 'semantic-ui-react';

const Topic = ({ topic, pos, onTopicButtonClick }) => {
  const creationDate = moment(topic.createdAt).format('MMM Do YY');

  return (
    <React.Fragment key={topic.topicId}>
      <Grid.Row>
        <Grid.Column width={9} verticalAlign="middle">
          {topic.title}
        </Grid.Column>
        <Grid.Column width={3} verticalAlign="middle">
          {`Comments ${topic.comments}`}
        </Grid.Column>
        <Grid.Column width={3} verticalAlign="middle">
          {creationDate}
        </Grid.Column>
        <Grid.Column width={1} floated="right">
          <Button icon color="teal" onClick={() => onTopicButtonClick(topic)}>
            <Icon name="hand point left outline" />
          </Button>
        </Grid.Column>
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
  );
};

export default Topic;
