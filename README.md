<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">Hot road app</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> This is an app that allow users to join a conversation about a topic that others can publish or even himself.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Description](#description)
- [Built Using](#built_using)

## 🧐 About <a name = "about"></a>

This is my capstone project of cloud developer nanodegree at Udacity.
As a user, you can register to the app with a nickname and a picture, and then post any topic that you want to discuss or add a comment to an existing one. Inside each topic, you can see a list of relative comments and who had posted it.
In the users area, topics can be deleted or renamed.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to install first [node js](https://nodejs.org/en/), [serverless](https://www.serverless.com/) and [AWS cli](https://aws.amazon.com/en/cli/). You will need also an AWS account.

### Installing

You can launch serverless stack with this command
```
sls deploy -v
```
Copy the https id and ws id in the given output to /front/config.js. This will connect frontend client with the services deployed in AWS.

For the frontend part, you need to install first the list of dependencies.
```
cd front
npm i
```
And then start the client.
```
npm run start
```

## 🎈 Description <a name="description"></a>

There are 4 dbs: users, topics, comments and connections.
When a user upload a profile picture, S3 saves it and notify by SNS message to a resize function that scales down the picture.
When a new topic is created, it send a ws message that tells every connected users that they have to update their topics list, so the new one can be seen.

## ⛏️ Built Using <a name = "built_using"></a>

Technologies and features

- [Serverless](https://www.serverless.com/) - Serverless deployment
- [React js](https://reactjs.org/) - Web Framework
- AWS lambda
- AWS DynamoDB
- AWS API gateway
- AWS SNS
- AWS X-RAY
- AWS S3
- Auth0
- Ws and HTTPS communications
