# Connect420

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1570f67a43984fbfba5bbe2abda1abdb)](https://app.codacy.com/manual/nick1014375/connect420?utm_source=github.com&utm_medium=referral&utm_content=NWylynko/connect420&utm_campaign=Badge_Grade_Dashboard)

A school project to create a simple game, I choose connect 4.

### environment variables (.env)
- REACT_APP_SERVER - default 'http://localhost:3001' - tells the client where the server is located at
- REACT_APP_SERVER_API - default undefined - set to /api or /c420 if the server is behind something like nginx

## to use environment variables
- in development
  - copy the .env.example to .env and run with yarn start

- in docker
  - define env in docker / docker-compose
```yml
version: '3'
services:
  c420:
    container_name: connect420
    image: nwylynko/connect420
    environment:
      - REACT_APP_SERVER=http://localhost:3002
      - REACT_APP_SERVER_API=
    ports:
      - "80:3000"
```

- in github action / firebase deploy
  - edit environment variables in the github action main.yml

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
