---
sidebar_position: 1
---

# Run Novu locally

## ⚡ Immediate working space with Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/novuhq/novu)

## Requirements

- Node.js version v16.15.1
- MongoDB
- Redis
- **(Optional)** pnpm - Needed if you want to install new packages
- **(Optional)** localstack (required only in S3 related modules)

Need help installing the requirements? Read more [here](https://novuhq.notion.site/Dev-Machine-Setup-98d274c80fa249b0b0be75b9a7a72acb#a0e6bf0db22f46d8a2677692f986e366).

## Setup the project

After installing the required services on your machine, you can clone and set up your forked version of the project:

- Fork [Novu's repository](https://github.com/novuhq/novu). Clone or download your fork to your local machine.
- Run the initial setup command `npm run setup:project` to install and build all dependencies.
- Run the project locally using `npm run start`.

The `npm run start` will start all the services in parallel including the APIs and web clients.
If you only want to run parts of the platform, you can use the following run commands from the root project:

- **start:dev** - Synonym to `npm run start`
- **start:web** - Only starts the web management platform
- **start:ws** - Only starts the WebSocket service for notification center updates
- **start:widget** - Starts the widget wrapper project that hosts the notification center inside an iframe
- **start:api** - Runs the API in watch mode
- **start:dal** - Runs the Data Access Layer package in watch mode
- **start:shared** - Starts the watch mode for the shared client and API library
- **start:node** - Runs the `@novu/node` package in watch mode
- **start:notification-center** - Runs and builds the React package for the Novu notification center

## Set up your environment variables

The command `npm run setup:project` creates default environment variables that are required to run Novu in a development environment.
However, if you want to test certain parts of Novu or run it in production mode, you need to change some of them. These are all the available environment variables:

<details>
    <summary>API Backend</summary>
    <div>
      <ul>
        <li><code>NODE_ENV</code> (default: local)<br />The environment of the app. Possible values are: dev, test, prod, ci, local</li>
        <li><code>S3_LOCAL_STACK</code><br />The AWS endpoint for the S3 Bucket required for storing various media</li>
        <li><code>S3_BUCKET_NAME</code><br />The name of the S3 Bucket</li>
        <li><code>S3_REGION</code><br />The AWS region of the S3 Bucket</li>
        <li><code>PORT</code><br />The port on which the API backend should listen on</li>
        <li><code>FRONT_BASE_URL</code><br />The base url on which your frontend is accessible for the user. (e.g. web.novu.co)</li>
        <li><code>DISABLE_USER_REGISTRATION</code> (default: false)<br />If users should not be able to create new accounts. Possible values are: true, false</li>
        <li><code>REDIS_HOST</code><br />The domain / IP of your redis instance</li>
        <li><code>REDIS_PORT</code><br />The port of your redis instance</li>
        <li><code>REDIS_PASSWORD</code><br />Optional password of your redis instance</li>
        <li><code>JWT_SECRET</code><br />The secret keybase which is used to encrypt / verify the tokens issued for authentication</li>
        <li><code>SENDGRID_API_KEY</code><br />The api key of the Sendgrid account used to send various emails</li>
        <li><code>MONGO_URL</code><br />The URL of your MongoDB instance</li>
        <li><code>NOVU_API_KEY</code><br />The api key of web.novu.co used to send various emails</li>
        <li><code>SENTRY_DSN</code><br />The DSN of sentry.io used to report errors happening in production</li>
      </ul>
    </div>
</details>

<details>
    <summary>WebSocket Service</summary>
    <div>
      <ul>
        <li><code>NODE_ENV</code> (default: local)<br />The environment of the app. Possible values are: dev, test, prod, ci, local</li>
        <li><code>SENTRY_DSN</code><br />The DSN of sentry.io used to report errors happening in production</li>
        <li><code>REDIS_HOST</code><br />The domain / IP of your redis instance</li>
        <li><code>REDIS_PORT</code><br />The port of your redis instance</li>
        <li><code>REDIS_DB_INDEX</code><br />The database index of your redis instance</li>
        <li><code>REDIS_PASSWORD</code><br />Optional password of your redis instance</li>
        <li><code>JWT_SECRET</code><br />The secret keybase which is used to encrypt / verify the tokens issued for authentication</li>
        <li><code>MONGO_URL</code><br />The URL of your MongoDB instance</li>
        <li><code>PORT</code><br />The port on which the WebSocket service should listen on</li>
      </ul>
    </div>
</details>

## Running tests

After making changes, you can run the tests for the respective package using the appropriate CLI commands:

### API

To run the API tests, run the following command:

```shell
npm run start:e2e:api
```

The tests create a new instance of Novu and a test db and run the tests against it. The test db is removed after all tests have finished running.

### Web

To run the front end tests for the web project using cypress you need to install localstack.
The cypress tests perform E2E tests. To be able to perform E2E tests, you need to run the API service in the appropriate test environment.

Run the services in test env with the following commands:

```shell
npm run start:e2e:api
npm run start:ws:test
```

Run the cypress test suite with the following command:

```shell
cd apps/web && npm run cypress:run
```

To open the cypress management window to debug tests, run the following commands:

```shell
cd apps/web && npm run cypress:open
```

### Different ports used by the services the project spins up

- **3000** - API
- **3002** - WebSocket service
- **4200** - Web Management UI
- **4500** - Iframe embed for notification center

### Testing providers

To run tests against the providers folder, you can use the `npm run test:providers` command.
