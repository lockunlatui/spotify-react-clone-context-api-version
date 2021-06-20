# Spotify React Clone - Context API Version
<img src="./screenshot/spotify-logo.jpg" width="300">
<img align="right" src="./screenshot/reactjs-logo.png" width="200">

Spotify React Clone is a using ReactJS library to creating a web single page.

## Features
- Login SSO with Spotify credentials.

## Install
### Node
```
https://nodejs.org/en/
```
You should choose to "Recommended For Most Users" version.

### ReactJS
```
npm install -g create-react-app
```

## Getting started
Use this link to clone this project:
```
https://github.com/lockunlatui/spotify-react-clone-context-api-version.git
```

### Setup to Client
You use to below command:

```
cd spotify-react-clone-context-api-version
```

and

```
npm install
```

After we setup and install all package for client side (FRONT-END).

### Setup to Mongodb

We continue to register the MONGODB with this link (https://www.mongodb.com/)
and click to

<img src="./screenshot/try-free.png">

if you have account then you click to

<img src="./screenshot/sign-in.png">

After We have a Mongodb account then we log in and it will show as this image

<img src="./screenshot/create-organization.png">

click to "Create an Organization"

<img src="./screenshot/create-organization-1.png">

enter Name Your Organization field, select to "MongoDB Atlas" and "Next"

<img src="./screenshot/create-organization-2.png">

and "Create Organization".

Now we create new project as click to

<img src="./screenshot/new-project.png">

and enter field Name Project 
<img src="./screenshot/enter-field-project.png">

and Next and Create Project.

We build a Cluster.
<img src="./screenshot/build-a-cluster.png">

and "Create a cluster" start at FREE.

<img src="./screenshot/build-a-cluster-1.png">

You can choose any cluster that is right. But in this case, I choose Asia (Singapore).

And I click "Create Cluster".

We must wait some minutes until Cluster is creating.

Okey. After Cluster is created. We click to Connect.

<img src="./screenshot/connecting-1.png">

(1) Click to "Add Your Current IP Address" to MongoDB know that IP is permitted. 
(2) You fill to "Username" and "Password". This step will support us connecting with Mongodb.

If you completed it show to this image. 

<img src="./screenshot/connecting-2.png">

And click "Choose a connection method"

This step, I choose to "Connecting your application".
<img src="./screenshot/connecting-3.png">
and copy this command

```
mongodb+srv://dbUser:<password>@cluster0.xgfha.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```
change <password> to my password of database "dbUser". And open file .env in my source.
change "myFirstDatabase" to database in Collections.

<img src="./screenshot/env-1.png">

Continued to create Collection with click "Collections" button.

<img src="./screenshot/create-database.png">

click "Add My Own Data"

<img src="./screenshot/create-database-1.png">

and "Create". After copy name collection that I already created.

In this case, I copy "spotifyCloneReact".
<img src="./screenshot/create-database-2.png">

and paste to .env file. 
<img src="./screenshot/env-2.png">

Okey. We created new Mongodb database for my application. If

### Setup to Spotify App Auth.

Access to https://developer.spotify.com/dashboard/. And login

<img src="./screenshot/auth-spotify-1.png">

Click "Accept The Term".

Click "Create An App".

<img src="./screenshot/auth-spotify-2.png">

And click "Create". We have "Client ID" and "Client Secret" 

<img src="./screenshot/auth-spotify-3.png">

We copy both "Client ID" and "Client Secret" and open the .env file to paste into place CLIENT_ID, CLIENT_SECRET.

And final step, We click "Edit Settings". I write callback endpoint is "/api/v1/auth/spotify/callback" in server.ts file and run PORT 3001. But I still need to redirect to PORT 3000 of React. Should I config two URL callbacks

<img src="./screenshot/auth-spotify-4.png">

and Save.

Copy "/api/v1/auth/spotify/callback" to .env file and paste to REDIRECT_URI.

<img src="./screenshot/env-3.png">

So we completed all setup about environment.

Now i use command:

Start React app: 

```
npm start
```

Start Node app:

```
npm run start:api
```

## Screenshot
## Home when page don't have authenticate
<img src="./screenshot/home-not-authenticate.png">

## Home when page have authenticate
<img src="./screenshot/home.png">