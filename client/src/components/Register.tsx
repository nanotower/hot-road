import * as React, { useState} from 'react'
import Auth from '../auth/Auth'
import { 
    Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'


interface LogInProps {
  auth: Auth
}

interface LogInState {}


export  const Register = (props) => {
    const [userName, setUserName] = useState('')
    
    
    const handleChange = (event) => {
        setUserName(event.target.value)
    }
    const handleRegister = () => {
        let userRegistered
        if(userName.length === 0) {
            userRegistered = `User-${Date.now()}`
        }
    }

  return  (
      <div>
        <h1>Please, name your profile</h1>
        <Input focus placeholder='Fancy name' value={userName} onChange={handleChange} />
        <Grid.Row>
        <Grid.Column width={16}>
          <Input
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'add',
              content: 'New user',
              onClick: handleRegister
            }}
            fluid
            actionPosition="left"
            placeholder="Some fancy name"
            onChange={handleChange}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>

        <Button onClick={console.log} size="huge" color="olive">
          Save
        </Button>
      </div>
    )
}
