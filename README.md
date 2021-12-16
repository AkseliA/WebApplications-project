# WebApplications-project

This is a repository for a MERN stack project for web applications course. The project is a forum-like site, where users can register, login, post, comment and search for different posts.
In addition, authenticated users can edit/remove their own posts/comments and up/downvote posts and comments.

## Running the project

After cloning this repository,
to run this project, you will need to add the following environment variables to your .env file located in root of ./server

`SECRET` (Your secret value)

`NODE_ENV` (value should be production/development)

After setting the values run the following commands in the root directory:

`npm run-script install` to install all node modules (client&server)

Run in either development or production by following one of the following manuals.

### Development mode:

`NODE_ENV=development`

`npm run-script dev:server` To start the server. By default uses port 1234.

`npm run-script dev:client` To run client side in port 3000.

Running site can now be accessed in `http://localhost:3000`

### production mode build:

`NODE_ENV=production`

`npm run-script build` Creates a build folder, which is used to run the app

`npm run-script start` Starts the server in production mode.

Running site can now be accessed in `http://localhost:1234`

## Other

Further documentation can be found [here](https://linktodocumentation)

[Project Screenshots](https://linktodocumentation)
