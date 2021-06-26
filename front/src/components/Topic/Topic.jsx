import React from 'react';
import {
    Button,
    Checkbox,
    Divider,
    Grid,
    Header,
    Icon,
    Input,
    Image,
    Loader
  } from 'semantic-ui-react';


const Topic = ({topic, pos}) => {
    return (
        <Grid.Row key={topic.topicId}>
          <Grid.Column width={10} verticalAlign="middle">
            {topic.title}
          </Grid.Column>
          <Grid.Column width={3} floated="right">
            {`Comments ${topic.comments}`}
          </Grid.Column>
          <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => (console.log(pos))}
                >
                  <Icon name="hand point left outline" />
                </Button>
              </Grid.Column>
          <Grid.Column width={16}>
            <Divider />
          </Grid.Column>
        </Grid.Row>
      )
}

export default Topic;