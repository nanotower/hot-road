import React from 'react';
import styles from './User.module.css';
import { Image, Button, Icon } from 'semantic-ui-react';

const UserBox = ({ user, history }) => {
  return (
    <div className={styles.user}>
      <span className={styles.username}>{user.userName}</span>
      <Image src={user.attachmentUrl} avatar />
      <Button icon color="blue" content="focus" onClick={() => history.replace('/profile')}>
        <Icon name="pencil" />
      </Button>
    </div>
  );
};

export default UserBox;
