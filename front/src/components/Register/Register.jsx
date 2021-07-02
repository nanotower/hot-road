import React, { useState, useEffect } from 'react';

import { getUploadUrl, uploadFile, registerUser } from '../../api/forumApi';
import styles from './Register.module.css';
import { Button, Image, Form } from 'semantic-ui-react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { wsEndpoint } from '../../config';



const Register = ({ setUserState, auth, userState, history }) => {
  const [userName, setUserName] = useState('');
  const [userPic, setUserPic] = useState(
    'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E'
  );
  const [userFile, setUserFile] = useState({
    file: undefined,
    uploadState: 'NoUpload',
  });
  const client = new W3CWebSocket(wsEndpoint);

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log(message);
      console.log(userState);
      setUserPic(userState.attachmentUrl);
    };
    return () => {
      client.close();
    };
  }, []);

  const handleChange = (event) => {
    setUserName(event.target.value);
  };
  const handleRegister = async () => {
    if (userName.length === 0) {
      const defaultUserName = `User-${Date.now()}`;
      await registerUser({ userName: defaultUserName });
    } else {
      const userRegistered = await registerUser(auth.getIdToken(), {
        userName,
      });
      setUserState(userRegistered.newUser);
      // setUserPic(userRegistered.newUser.attachmentUrl);
      // auth.setUser(userRegistered.newUser);
    }
  };

  const setUploadState = (uploadState) => {
    setUserFile({
      ...userFile,
      uploadState,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!userFile) {
        alert('File should be selected');
        return;
      }

      setUploadState('FetchingPresignedUrl');
      const uploadUrl = await getUploadUrl(auth.getIdToken());

      setUploadState('UploadingFile');
      await uploadFile(uploadUrl, userFile.file);

      alert('File was uploaded!');
      setTimeout(() => {
        history.push('/');
      }, 3500);
    } catch (e) {
      alert('Could not upload a file: ' + e.message);
    } finally {
      setUploadState('NoUpload');
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (!files) return;

    setUserFile({
      ...userFile,
      file: files[0],
    });
  };

  const renderButton = () => {
    return (
      <div>
        {userFile.uploadState === 'FetchingPresignedUrl' && (
          <p>Uploading image metadata</p>
        )}
        {userFile.uploadState === 'UploadingFile' && <p>Uploading file</p>}
        <Button loading={userFile.uploadState !== 'NoUpload'} type="submit">
          Upload
        </Button>
      </div>
    );
  };

  const userNameComponent = () => {
    return (
      <div>
        <h2>Please, name your profile</h2>
        <Form onSubmit={handleRegister}>
          <Form.Field>
            <label>First Name</label>
            <input
              placeholder="Fancy name"
              value={userName}
              onChange={handleChange}
            />
          </Form.Field>
          <Button type="submit" color="olive">
            Submit
          </Button>
        </Form>
      </div>
    );
  };

  const picComponent = () => (
    <div>
      <h2>You can upload new profile image</h2>
      <div className={styles.imgContainerStyle}>
        <Image
          className={styles.imageStyle}
          src={userPic}
          size="small"
          rounded
        />
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>File</label>
          <input
            type="file"
            accept="image/*"
            placeholder="Image to upload"
            onChange={handleFileChange}
          />
        </Form.Field>

        {renderButton()}
      </Form>
    </div>
  );
  const isUserRegistered = Object.keys(userState).length === 0;

  return (
    <div className={styles.containerStyle}>
      {isUserRegistered ? userNameComponent() : picComponent()}
    </div>
  );
};

export default Register;
