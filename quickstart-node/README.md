# Monday-Code NodeJS Quickstart

This Node - express with typescript application is designed to showcase the practical use of monday code and monday
platform api
sdk by integrating various monday app functionalities. It's an essential resource for developers looking to leverage
and monday Platform API features through NodeJS environment.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

### Prerequisites

You need to have NodeJS and npm installed on your machine.
You can download NodeJS from [here](https://nodejs.org/en/download/package-manager) and it should install npm as well.

### Installing

To install the project, follow these steps:

1. Clone the repository
2. Navigate to the project directory
3. Install the required packages using npm:

```bash
cd quickstart-node
npm i
```

## Compiling Files

If you want to compile the ts files to js files you can use the following command in the project directory:

```bash
npm run build
```

## Generate GraphQL types

To generate types for your GraphQL queries / mutations / fragments, you can write them in the `queries.graphql.ts`
file and then run the following command:

```bash
npm run fetch:generate
```

## Running the Application

To run the application in development mode, use the following command in the project directory:

```bash
npm run dev
```

**NOTE**: This command also creates a tunnel using `monday-apps-cli`, if you only want to run your server run:
`npm run server`.

You can also start the application for production after you compiled the ts files using this command:

```bash
npm run start
```

If you did not set a port environment variable, the application will start running at `http://0.0.0.0:3000`.

## Features

This app showcases how to use various Monday app functionalities, including:

### Monday Code Features

* Using Monday apps Storage and Secure Storage
* Using Monday apps Secrets and Environment variables
* Using Monday apps Queue
* Using Monday code Logger

To learn more about monday code you can
click [here](https://developer.monday.com/apps/docs/quickstart-guide-for-monday-code).

**NOTE**: Storage feature does not work locally, you can only check it after you push your code to monday code.

### Monday Platform API Usage

* An example of updating column value in an item
* An example of a custom query with generated types
* An example of error handling with the monday Platform API

### Integration and Authentication

* Implementing OAuth process
* Authenticating with JWT (JSON Web Tokens)

### Custom Actions and Triggers in Monday

* Creating custom actions and triggers
* Implementing an integration recipe
* Deploying the app to Monday code

### Error Handling

* Example of global error handler middleware
* Example of monday Platform API error handling middleware

If you want to learn more about how to send appropriate error messages from your app to monday automations
click [here](https://developer.monday.com/apps/docs/error-handling).

## Setting up the app in Monday

Follow the instructions listed in the [SETUP.md](SETUP.md) file

### NOTE:

    This project is only a demonstration of how to use various monday code app and monday Platform API functionalities.
    It is not intended for production use without further modifications.
    Please ensure to review and update the code as necessary to fit your specific needs and requirements
    Remember to keep your OAuth credentials secure and do not expose them in your code or version control system. Use environment variables or other secure methods to handle sensitive data.
