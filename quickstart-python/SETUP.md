## Setup Overview

### Base setup of the app in Monday

To set up the app in Monday, follow these steps:

1. Open monday.com, login to your account and go to a "Developers" section.
2. Create new "monday-code Example App".
3. Open "Features" section and create new "Integration template" feature.
4. Choose the "Start from scratch" template and name your feature.
5. Create a new build and set the project's exposed URL in the "Base URL" field. (You can use
   Monday's [tunneling service](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-tunnelcreate) to
   expose your local server to the internet). This step is temporary and will be replaced with the URL of your app in
   Monday Code.

### Configure OAuth in Monday

1. Press `OAuth` in the `General` section of the left menu.
2. Enter the `Redirect URLs` tab.
3. Add the following URL: `https://<YOUR_URL>/auth/monday/callback` and **press save**.
4. Don't forget to change the URL after deploying the app to Monday Code.

Congrats, you have successfully set up the app in Monday! 🎉

### Setting up the Environment Variables

1. For setting environment variables in production after deploying to monday-code-
    1. You can use @mondaycom/apps-cli to set the project secrets:
        1. Install apps-cli:
           ```bash
           $ npm i -g @mondaycom/apps-cli
           ```
        2. Set secrets:
           ```bash
           $ mapps code:env
           ```
           Choose the app to set environment variables > set > enter the secret key > then enter the value of the
           secret. The secret will be injected into process.env of your deployment.
    2. instead, you can set the secrets manually in monday-code by going to the `General` tab under monday code and
       then `Environment Variables` section.

### Deploying the App to Monday Code

1. Go to the `General` tab under monday code, click on `Connect monday code` and follow the instructions on the screen.
2. Choose you integration Feature Under the `Feature` tab, create a new build and choose monday code as the deployment
   target.
3. Reconfigure the OAuth redirect URL with the new URL provided by Monday Code.

That's it! You have successfully deployed the app to Monday Code. 🚀

### Happy building! 🎉