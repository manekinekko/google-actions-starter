'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _googleActionsServer = require('@manekinekko/google-actions-server');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MyAction = function () {
    function MyAction() {
        _classCallCheck(this, MyAction);

        // create a google action server
        this.agent = new _googleActionsServer.ActionServer();

        this.agent.setGreetings(['Hello, my name is Wassim (aka Maneki Nekko on the Internet). \n            Congratulations! This is your first action on Google Actions and Google Home. \n            Tell me somthing and I will repeat it']);

        this.agent.setConversationMessages(['Tell me something else', 'Try something else', 'Try again', 'Come on, try again']);

        this.assistant = null;
    }

    // the (default) intent triggered to welcome the user


    _createClass(MyAction, [{
        key: 'welcomeIntent',
        value: function welcomeIntent(assistant) {
            this.assistant = assistant;
            this.agent.randomGreeting();
        }

        // the intent triggered on user's requests

    }, {
        key: 'textIntent',
        value: function textIntent(assistant) {
            this.assistant = assistant;
            var rawInput = assistant.getRawInput();
            this.agent.ask('\n            I heard ' + rawInput + '.\n            ' + this.agent.getRandomConversationMessage() + '\n        ');
        }

        // the intent triggered by deep links defined in "action.json"

    }, {
        key: 'dateIntent',
        value: function dateIntent(assistant) {
            this.assistant = assistant;
            var rawInput = assistant.getRawInput();
            var date = new Date().toLocaleString();
            this.agent.ask('<speak>\n        <say-as interpret-as="date" format="mmddyyy" detail="1">\n            ' + date + '\n        </say-as>\n        </speak>');
        }

        // start everything!!

    }, {
        key: 'listen',
        value: function listen() {
            // register intents and start server
            this.agent.welcome(this.welcomeIntent.bind(this));
            this.agent.intent(_googleActionsServer.ActionServer.intent.action.TEXT, this.textIntent.bind(this));
            this.agent.intent('my.deeplink.intent', this.dateIntent.bind(this));
            this.agent.listen();
        }
    }]);

    return MyAction;
}();
// instantiate


new MyAction().listen();