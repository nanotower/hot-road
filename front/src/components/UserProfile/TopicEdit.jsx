import React, {useState} from 'react'
import {
    Button,
    Divider,
    Grid,
    Icon,
    Input,
  } from 'semantic-ui-react'

const TopicEdit = ({topic, handleNameTopicSubmit, handleDeleteTopic}) => {
    const [topicTitle, setTopicTitle] = useState(topic.title);

    const inputRef = React.useRef();

    const handleClick = () => inputRef.current.focus();

    const handleChangeName = (event) =>
        setTopicTitle(event.target.value);

    const handleSubmitUpdate = () => 
        handleNameTopicSubmit(topic.topicId, topicTitle);

    return (
        <Grid.Row key={topic.topicId}>
              <Grid.Column width={13} verticalAlign="middle">
                <Input ref={inputRef} value={topicTitle} onChange={handleChangeName} />
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  content='focus' 
                  onClick={handleClick}
                >
                  <Icon name="pencil" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue" 
                  onClick={handleSubmitUpdate}
                >
                  <Icon name="checkmark" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => handleDeleteTopic(topic.topicId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
    )
}

export default TopicEdit;
