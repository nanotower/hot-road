import React, { useState } from 'react';
import { Divider, Grid, Input } from 'semantic-ui-react';
import { createTopic } from '../api/forumApi';

const CreateTopic = ({auth, fetchTopics, setLoading}) => {
  const [topicName, setTopicName] = useState('');

  const handleNameChange = (event) => {
    setTopicName(event.target.value );
  }

  const onTodoCreate = async (event) => {
    try {
      setLoading(true);
      await createTopic(auth.getIdToken(), {
        title: topicName,
      })
      fetchTopics();
    } catch {
      alert('Topic creation failed')
    }
  }

  return (
    <Grid.Row key="newTopic">
      <Grid.Column width={16}>
        <Input
          action={{
            color: 'teal',
            labelPosition: 'left',
            icon: 'add',
            content: 'New topic',
            onClick: onTodoCreate,
          }}
          fluid
          actionPosition="left"
          placeholder="Some interesting topic"
          onChange={handleNameChange}
        />
      </Grid.Column>
      <Grid.Column width={16}>
        <Divider />
      </Grid.Column>
    </Grid.Row>
  );
};

export default CreateTopic;
