import React, { useEffect, useState } from 'react';
import { deleteTopic, getUserTopics } from '../../api/forumApi';

import { updateTopicName } from '../../api/forumApi';
import TopicEdit from './TopicEdit';
import {
  Grid,
  Loader
} from 'semantic-ui-react';
import styles from './UserProfile.module.css';

const UserProfile = ({ auth }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setloading] = useState(false);
  // const [topicName, setTopicName] = useState('');

  useEffect(() => {
    setloading(true);
    getDbUserTopics();
  }, []);

  const getDbUserTopics = async () => {
    const topics = await getUserTopics(auth.getIdToken());
    setTopics(topics);
    setloading(false);
  };

  const handleDeleteTopic = async (topicId) => {
    setloading(true);
    await deleteTopic(auth.getIdToken(), topicId);
    getDbUserTopics();
  };

  const handleNameTopicSubmit = (topicId, topicTitle) => {
    const updateTitle = {title: topicTitle};
    updateTopicName(auth.getIdToken(), topicId, updateTitle);
  }

  const topicsList = () => {

    return loading ? (
      <Loader indeterminate active inline="centered">
        Loading Topics
      </Loader>
    ) : (
      <div className={styles.topics}>
        <Grid padded className={styles.grid}>
          {topics.map((topic, pos) => (
            <TopicEdit
              topic={topic}
              pos={pos}
              handleDeleteTopic={handleDeleteTopic}
              handleNameTopicSubmit={handleNameTopicSubmit}
            />
          ))}
        </Grid>
      </div>
    );
  };

  return (<div>
{topicsList()}
  </div>);
};

export default UserProfile;
