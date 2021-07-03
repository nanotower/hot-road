import React, { useState } from 'react';

import { getUploadUrl, uploadFile, registerUser } from '../../api/forumApi';
import styles from './Register.module.css';
import { Button, Form } from 'semantic-ui-react';

const Register = ({ setUserState, auth, userState, history }) => {
  const [userName, setUserName] = useState('');
  const [userFile, setUserFile] = useState({
    file: undefined,
    uploadState: 'NoUpload',
  });

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
      alert('File was uploaded! Click home');

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
