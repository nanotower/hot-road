import React from 'react';
import styles from './User.module.css';
import { Image } from 'semantic-ui-react';

const UserBox = ({user}) => {
  return (
    <div className={styles.user}>
      <span className={styles.username}>{user.userName}</span>
      <Image src={user.attachmentUrl} avatar />
    </div>
  );
};

export default UserBox;
