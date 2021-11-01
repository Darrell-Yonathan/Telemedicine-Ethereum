This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# v1.8.0 Update
- Role type-based access control (doctor role and uploader role)
- Extra files for time testing (to measure time taken during role type verification)

## Preliminary

Before you clone this project, you need to have these in your system:
- Node.js
- Internet browser (Chrome, Firefox, Brave, or Edge)
- Metamask browser extension

## Cloning and Installing The Dependencies

After that, clone this project, open Command Prompt and go to the directory of this project.<br />
Then, install all dependencies by running the following script.

### `npm install`

or (if npm fails)

### `yarn install`

## Running The Program

After the packages are installed successfully, run the following script.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Time Testing (Optional)

There are two files that are available for testing to measure the time taken.<br />
The time is the time taken for verification of the role before uploading/search the medical information.
- Send.js: the component for uploading the data
- getData.js: the component to search the uploaded data

Those two files don't have time testing function by default. The two files with time testing function are:
- Send-for-time-taken-testing.js: Send.js with time testing function
- getData-for-time-taken-testing.js: getData.js with time testing function

To run the time testing, replace the file **{...}-for-time-taken-testing.js** to **{...}.js**.<br />
For example: replacing Send-for-time-taken-testing.js to Send.js<br />

The time testing can be performed by performing the **Verify Role** in **Check Data** or **Upload Image** feature page using DevTools (pressing F12 for Google Chrome browser).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
