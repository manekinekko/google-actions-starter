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
        "projectId": "my first action",
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

**NOTE:** if you're deploying your action on Google Cloud, use your Google Cloud Project ID instead of "my first action".

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
        "action:deploy": "echo 'coming soon'",
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
