<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/1699357/21663314/b022ace0-d2df-11e6-8713-9f68b1c3ee3b.png" width="350">
</p>
<h2 align="center">GAS-S: <a href="https://github.com/manekinekko/google-actions-server">Google Assistant Server</a> Starter <img src="https://circleci.com/gh/manekinekko/google-actions-starter.svg?style=svg"></h2>
<p align="center">A Node.js server for your <a href="https://developers.google.com/actions/">Google Assistant</a> (and <a href="https://madeby.google.com/home/">Google Home</a>).</p>

<img src="https://cdn-images-1.medium.com/max/2000/1*51-QcjdjlRiy4_ya2NjA2g.png" align="center"/>


## [Action Manifest](https://developers.google.com/actions/develop/sdk/actions) (action.json)

```
{
    "versionLabel": "1.0.0",
    "agentInfo": {
        "languageCode": "en-US",
        "projectId": "my-first-action",
        "voiceName": "female_2"
    },
    "actions": [{
        "initialTrigger": {
            "intent": "assistant.intent.action.MAIN"
        },
        "httpExecution": {
            "url": "<PUBLIC URL>"
        }
    }]
}
```

**NOTE:** if you're deploying your action on Google Cloud, use your Google Cloud Project ID instead of "my-first-action".

## Package.json

In the `package.json`, we provide you with the following (handy) scripts:

```json
{
    "scripts": {
        "start": "npm run server",
        "server": "nodemon dist/action.js",
        "ngrok": "ngrok http 8080",
        "build": "babel lib -d dist",
        "build:watch": "npm run build -- -w",
        "action:simulate": "gactions --verbose simulate",
        "action:preview": "node ./scripts/preview_action.js",
        "action:config": "node ./scripts/update_action_config.js",
        "action:autopreview": "npm run action:config && npm run action:preview",
        "action:deploy": "gactions deploy --action_package action.json --project my-first-action",
        "release": "npm run build && npm version patch && git push --tags && git push && npm publish"
    }
}
```

**NOTE:** The default port used by GAS is `8080`. See [API section](https://github.com/manekinekko/google-actions-server#actionserverport--8080).

Tools bunlded by GAS for devs needs:

1. [gactions](https://developers.google.com/actions/tools/gactions-cli): is the command line interface that you use to preview, simulate, and publish an action package. If you encouter errors with the bundled binary, use the [gactions](https://developers.google.com/actions/tools/gactions-cli) from the official website. GAS includes this just for convenience.
2. [nodemon](https://github.com/remy/nodemon): Monitor for any changes in your node.js application and automatically restart the server.
3. [ngrok](https://github.com/inconshreveable/ngrok): Introspected tunnels to localhost. Allows Google's server to access your local action (while in dev mode)

# Step by Step

0. run `npm install` to install all deps
4. run `npm start`
1. run `npm run ngrok` and keep it running in the background,
3. run `npm run action:autopreview`, and **follow the instructions on the terminal**,
5. run `npm run action:simulate` to start the simulator in CLI mode (or use Google Home)
6. type in `talk to my first action` or `start my first action`

**HINT #1:** you can run `npm run build:watch` in order to watch and rebuild your files on the fly while you're working on your action.

**HINT #2:** I you have a Google Home device, you can use it instead of using the simulator.

**NOTE:** If you already have a dev server where you can host your this project, you can use your own URL in `httpExecution.url` and skip steps 1 and 2. And run `npm run action:preview` instead. See `package.json` for more details.

## GAS API

See the [GAS documentation](https://github.com/manekinekko/google-actions-server) from more details.

## Deep Link invocation

In order to make a [deep link invocation](https://developers.google.com/actions/develop/sdk/invocation-and-discovery#deep_link_invocation), you have to provide two things:

1. an invocation query in your `action.json` (see [this example](https://github.com/manekinekko/google-actions-starter/blob/master/action.json#L17-L21))
2. [an intent](https://github.com/manekinekko/google-actions-starter/blob/master/action.json#L18) (and its implementation [here](https://github.com/manekinekko/google-actions-starter/blob/master/lib/action.js#L58) and [here](https://github.com/manekinekko/google-actions-starter/blob/master/lib/action.js#L42-L51)) that will be triggered when your action will be launched with the invocation query.

Then you just have to start your action like so:

```
talk to my first action to <ONE OF THE DEEP LINK QUERIES HERE>
```

For instance:

```
talk to my first action to know what is the date
```

## Deployment

### Deploy the Fulfillment Endpoint

After you have created a Conversation Action you must first deploy your fulfillment endpoint to any provider, such as Google Cloud:

1. Create a new project in [Google Cloud Platform Projects](https://console.cloud.google.com/iam-admin/projects) and [enable billing](https://support.google.com/cloud/answer/6293499?hl=en).
2. Set current project with `gcloud config set project my-first-action`.
3. Replace `my-first-project` with your project ID in `vm.yaml` and run `gcloud deployment-manager deployments create production --config vm.yaml`. You can check your deployment with `gcloud deployment-manager deployments describe production`.
4. Deploy your code with `npm run build && gcloud app deploy`.

### Create an Actions API Project

1. Create a [new Google Actions API project](https://console.developers.google.com/apis/dashboard).
2. Configure the project in "Directory listing". It's important to get the sample invocations right, eg. "Ok Google, ask my first action to ...".

### Deploy Action

Deploying the action makes it usable by others by submitting it for approval with Google.

**NOTE:** Once submitted you have to wait for your action to be rejected or approved, there's no way to un-submit an action without [contacting support](https://developers.google.com/actions/support/?requesttype=support&prio=low).

1. Change the `httpExecution` URL(s) in action.json to the deployed fulfillment URL, eg. `https://my-first-action.appspot-preview.com`.
2. Replace `my-first-action` by your action's ID in `package.json`.
3. Run `npm run action:deploy`, which will register and deploy your action.

See the [GAS documentation](https://developers.google.com/actions/distribute/deploy) for more details.

## Example projects

- https://github.com/manekinekko/google-actions-rxjs
- https://github.com/manekinekko/google-actions-twitter
- https://github.com/manekinekko/google-actions-reader
- https://github.com/manekinekko/google-actions-learn-angular

## License

The MIT License (MIT)
Copyright (c) 2017 - Wassim CHEGHAM

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
