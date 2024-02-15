## MERN Chat App

https://custom-mern-chat-app-production.onrender.com/chats

A dynamic chat room that allows users to join and engage in real time conversations in both person-to-person and group format.

## Project Screenshot

#### Example:

[ PRETEND SCREEN SHOT IS HERE ]

## Installation and Setup Instructions

#### Example:

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`cd .\backend\`  
`npm install`  
`npm start`

`cd .\frontend\`  
`npm install`  
`npm start`

To Start Server:

`npm start`

To Visit App:

`localhost:3000/`

## Reflection

-Used MongoDB to store user, chat and message data
-Used bcrypt for hashing passwords
-Used JWT to authenticate routes
-Used socket.io to provide seamless realtime bi-directional communication
-Used Chakra UI for react components

One of the main challenges I ran into was Authentication. This lead me to spend a few days on a research spike into jsonwebtokens and using localstorage hook to interact with cookies. Due to project time constraints, I couldn't implement OAuth2 to provide users the ability to sign in using Google, Facebook or any other third party sites.
