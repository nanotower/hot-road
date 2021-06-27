import React, { useEffect, useState } from 'react';
import { deleteTopic, getUserTopics } from '../../api/forumApi';

const UserProfile = ({ auth }) => {
  const [topics, setTopics] = useState([]);
  const [topicName, setTopicName] = useState('');

  useEffect(() => {
    getDbUserTopics();
  }, []);

  const getDbUserTopics = async () => {
    const topics = await getUserTopics(auth.getIdToken());
    setTopics(topics);
  };

  const handleDeleteTopic = async (topicId) => {
    await deleteTopic(auth.getIdToken(), topicId);
    getDbUserTopics();
  };

  const handleChangeTopicName = (event) =>
    setTopicName(props.auth.getIdToken());

  const handleNameTopicSubmit = () => {
    
  }

  return <div></div>;
};

export default UserProfile;
