import * as React from 'react';
import { Button } from 'semantic-ui-react';

const LogIn = (props) => {
  const onLogin = () => {
    props.auth.login();
  };
  return (
    <div>
      <h1>Please log in</h1>
      <Button onClick={onLogin} size="huge" color="olive">
        Log in
      </Button>
    </div>
  );
};
export default LogIn;
