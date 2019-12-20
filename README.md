# [Macroscope](https://macroscope.tech) front end

Analysis of langauge made simple.

![Logo](./public/logo192.png)

## Bugs and Enhancement Requests

We welcome contributions and feedback on our site! Please file a request in our issue tracker and we'll take a look. Or you can can contact us by [email](mailto:macroscope-project@protonmail.com).

## Browser Support 

Recent versions of Chrome and Firefox will be actively supported.

## Contributing

To contribute to the repository follow these steps:
1. Fork the repository
2. Clone the forked repository to your local environment
3. [Build](#building) the project locally
4. Make your changes to the code
5. Commit your changes and push them to the forked repository
6. You can then make a pull request which we will then review


## Building

Install [NodeJS](https://nodejs.org/en/) - we recommend just installing [nvm](https://github.com/nvm-sh/nvm) which manages node versions.

Configure the app using the [.env](#.env) file.

Then open the ```macroscope-front-end``` directory in a terminal and run
```
npm install && npm start
```

## .env

The project uses a [.env](https://github.com/motdotla/dotenv) file for configuration. 


This file is not included in the repository and you will have to create it yourself. Open the ```macroscope-front-end``` directory in a terminal and run

```
touch .env
```

The following is an example ```.env``` file

```
REACT_APP_BASE_API_URL=https://apiurl
REACT_APP_API_KEY=apikey
REACT_APP_NODE_ENV=production
```

```REACT_APP_BASE_API_URL``` - sets the url of the api to use.

```REACT_APP_API_KEY``` - sets the api key to the key you should have been provided.

```REACT_APP_NODE_ENV``` - sets the environment. If you are running the app in development then you do not need to specify this option.



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm coverage`

Generates a coverage report located at [./coverage/lcov-report/index.html](./coverage/lcov-report/index.html)

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Alternative Packages

### Graphs 

* https://github.com/danvk/dygraphs

## Info

* Github svg sourced from [svg porn](https://svgporn.com/).
* Old front end ip 51.89.148.58:88. Works with search terms "love" and "test".