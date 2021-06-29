import React, { useEffect, useState } from 'react';
import { deleteTopic, getUserTopics } from '../../api/forumApi';

import { updateTopicName, getUser } from '../../api/forumApi';
import TopicEdit from './components/TopicEdit';
import { Grid, Loader, Image } from 'semantic-ui-react';
import styles from './UserProfile.module.css';

const UserProfile = ({ auth, user }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userInDb, setUserInDb] = useState(user);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    getDbUserTopics();
    getUserInDb();
  }, []);

  const getDbUserTopics = async () => {
    setloading(true);
    const topics = await getUserTopics(auth.getIdToken());
    setTopics(topics);
    setloading(false);
  };

  const getUserInDb = async () => {
    setLoadingUser(true);
    const fetchUser = await getUser(auth.getIdToken());
    setUserInDb(fetchUser);
    setLoadingUser(false);
  };

  const handleDeleteTopic = async (topicId) => {
    setloading(true);
    await deleteTopic(auth.getIdToken(), topicId);
    getDbUserTopics();
  };

  const handleNameTopicSubmit = async (topicId, topicTitle) => {
    setUpdating(true);
    const updateTitle = { title: topicTitle };
    await updateTopicName(auth.getIdToken(), topicId, updateTitle);
    setUpdating(false);
    alert('Topic title was updated succesfuly');
  };

  const userProfileContainer = () => {
    return loadingUser ? (
      <Loader indeterminate active inline="centered">
        Loading User
      </Loader>
    ) : (
      <div className={styles.user}>
        <span className={styles.username}>{userInDb.userName}</span>
        <Image
          src={userInDb.attachmentUrl}
          size="tiny"
          verticalAlign="middle"
        />
        <p>{`You have ${userInDb.topics} topics`}</p>
      </div>
    );
  };

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
              loading={updating}
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

  return (
    <div>
      {userProfileContainer()}
      {topicsList()}
    </div>
  );
};

export default UserProfile;
