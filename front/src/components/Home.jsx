import React from 'react';

const Home = (props) => {
    const user = props.auth.userRegistered? props.auth.userRegistered : props.userState;

    return (
        <div>
            <h1>Hey</h1>
            <h2>{user.userName}</h2>
        </div>
    )
}

export default Home;
