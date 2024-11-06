## Setup Overview

### Base setup of the app on Monday

To set up the app on Monday, follow these steps:

1. Open monday.com, login to your account and go to the "Developers" section.
2. Create a new "Monday-code Example App".
3. Open the "Features" section and create a new "Integration template" feature.
4. Choose the "Start from scratch" template and name your feature.
5. Create a new build and set the project's exposed URL in the "Base URL" field.
   You can use
   Monday's [tunneling service](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-tunnelcreate) to
   expose your local server txo the internet.
   This step is temporary and will be replaced with the URL of your app in monday code.

### Setting authorization URL

1. Under `Feature Details` in your integration feature scroll down to the `Authorization URL` section.
2. Tick the `Enable Authorization URL` checkbox.
3. Enter the URL of your app that will start the OAuth process, in our case, `/auth/`.

### Configure OAuth in Monday

1. Press `OAuth` in the `General` section of the left menu.
2. Enter the `Redirect URLs` tab.
3. Add the following URL: `https://<YOUR_URL>/auth/monday/callback` and **press save**.
4. Don't forget to change the URL after deploying the app to Monday Code.

Congrats, you have successfully set up the app on Monday! 🎉

### Deploying the App to Monday Code

1. Go to the `General` tab under monday code, click on `Connect monday code` and follow the instructions on the screen.
2. Choose your integration Feature Under the `Feature` tab, create a new build and choose monday code as the deployment
   target.
3. Reconfigure the OAuth redirect URL with the new URL provided by Monday Code.

That's it! You have successfully deployed the app to Monday Code. 🚀

### Setting up Environment Variables

1. Go to the `General` tab under monday code and navigate to the `Environment Variables` section.
2. Set all the needed environment variables for this app, which can be found in the `.env.example` file.

### Setting up Secrets

1. Go to the `General` tab under monday code and navigate to the `Secrets` section.
2. Set the following environment variables for this app:
    - `MONDAY_OAUTH_CLIENT_SECRET`
    - `MONDAY_SIGNING_SECRET`

### Creating a Custom Action

1. Choose your integration Feature Under the `Feature` tab, under `Workflow Blocks` create a new action.
2. Give the action a name, for this example, let's call it `Send an email`.
3. Of course, you can
   add [Input Fields](https://developer.monday.com/apps/docs/custom-actions#configure-action-input-fields) based on your
   requirements.
4. Define a [Sentence](https://developer.monday.com/apps/docs/custom-actions#define-action-sentence) for the action, for
   example, `Send an email to {email}`.
5. Finally, Provide the relative path to the action in the API Configuration section, in our case- `/mail/send`.

### Creating a Recipe

1. Choose your integration Feature Under the `Feature` tab, under `Recipes` create a new recipe.
2. Choose a trigger, for this example, let's choose `When status changes`.
3. Choose the action you created in the previous step, `Send an email`.

That's it! You have successfully created a recipe on Monday!

### Using the recipe

1. Go to a board on Monday and create a new automation.
2. Choose the recipe you created in the previous step.
3. Configure the recipe based on your requirements, in this case, you need to choose a status column.
4. Test the recipe by changing the status of an item.
5. Check the logs in the Monday Code console to see the recipe in action.

## Monday API Usage

In this quickstart we also added examples of Monday API usage. In these examples you can see
usage of update column, custom query and how to handle Monday API errors.

- If you want to read more about the Monday API SDK and how to use it properly, you can
  click [here](https://www.npmjs.com/package/@mondaydotcomorg/api).
- If you use typescript and want to generate types for your queries/mutations/fragments you can
  click [here](https://www.npmjs.com/package/@mondaydotcomorg/setup-api) and learn how to do it.
- If you want to know which queries and mutations you can run on the Monday API,
  click [here](https://developer.monday.com/api-reference/reference/about-the-api-reference).

### Configure OAuth Permissions

In order for the app to read and set your board data, it will need permissions to do that:

1. Press `OAuth` in the `General` section of the left menu.
2. Check the `boards:read` and `boards:write` boxes

### Custom Actions with Monday API Usage

In this example you will create an action that does this: when an item is created, it changes the last item (based on
their date column) status to
whatever you choose.

### Creating a Custom Action

The steps are very similar to the steps in this [section](#creating-a-custom-action), except for a couple of things:

1. The action name should be different, for example `Update Last Item Status`.
2. You need to choose
   these [Input Fields](https://developer.monday.com/apps/docs/custom-actions#configure-action-input-fields)
    1. Board Id - `Field Type: Board`, `Field Key: boardId`, `Source: Context`.
    2. Group Id - `Field Type: Group`, `Field Key: groupId`, `Source: Trigger Output`.
    3. Status Column Id - `Field Type: Status Coulmn`, `Field Key: statusColumnId`, `Source: Recipe Sentence`,
       `Display Name: Status Column`.
    4. Date Column Id - `Field Type: Coulmn`, `Field Key: dateColumnId`, `Source: Recipe Sentence`,
       `Display Name: Date Column`, `Allowed column types: Date`.
    5. Status Column Value - `Field Type: Status Column Value`, `Field Key: statusColumnValue`,
       `Source: Recipe Sentence`,
       `Display Name: Status Column Value`, `Omit Anything status: true`.
3. The [Sentence](https://developer.monday.com/apps/docs/custom-actions#define-action-sentence) should be something
   like: `Change last item {Status Column} to {Status Column Value} based on {Date Column}`.
4. The relative path should be `/monday/change-last-item-status`

### Creating a Recipe

Here the steps are also similar to this [section](#creating-a-recipe), but you need to choose different trigger and
input fields:

1. When creating the recipe, choose this trigger: `When Item Is Created`
2. The action you need to choose is `Update Last Item Status`.

### Using the Recipe

Here the steps are also similar to this [section](#using-the-recipe), but you need choose input fields. Make sure you
have at least one column of type status and one column of type date. Try to create an item and see if the last item
status changes to what you chose. If it does, Congratulations! you created an action that uses Monday API
successfully.

### Happy building! 🎉
