# Monday-Code PHP Quickstart
This PHP simple demo is designed to showcase the use of some of the monday code platform functionalities

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites for local dev

You need to have php and composer.phar setup on your machine 

### Installing

To install the project, follow these steps:

1. Clone the repository
2. Navigate to the project directory
3. Install the required packages using composer:

```bash
php composer.phar update
```

## Running the Application Locally

To run the application, use the following commands in the project directory:

```bash
docker compose up
php -S 0.0.0.0:8080
```

The application will start running at `http://0.0.0.0:8080`.

## Deploying to monday code
To deploy to monday code, run:

```bash
mapps code:push
```