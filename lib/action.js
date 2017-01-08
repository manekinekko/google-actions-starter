import { ActionServer } from '@manekinekko/google-actions-server';

class MyAction {
    constructor() {

        // create a google action server
        this.agent = new ActionServer();

        this.agent.setGreetings([
            `Hello, my name is Wassim (aka Maneki Nekko on the Internet). 
            Congratulations! This is your first action on Google Actions and Google Home. 
            Tell me somthing and I will repeat it`
        ]);

        this.agent.setConversationMessages([
            `Tell me something else`,
            `Try something else`,
            `Try again`,
            `Come on, try again`
        ]);

        this.assistant = null;
    }

    // the (default) intent triggered to welcome the user
    welcomeIntent(assistant) {
        this.assistant = assistant;
        this.agent.randomGreeting();
    }

    // the intent triggered on user's requests
    textIntent(assistant) {
        this.assistant = assistant;
        let rawInput = assistant.getRawInput();
        this.agent.ask(`
            I heard ${rawInput}.
            ${this.agent.getRandomConversationMessage()}
        `);
    }

    // the intent triggered by deep links defined in "action.json"
    dateIntent(assistant) {
        this.assistant = assistant;
        let rawInput = assistant.getRawInput();
        const date = new Date().toLocaleString();
        this.agent.ask(`<speak>
        <say-as interpret-as="date" format="mmddyyy" detail="1">
            ${date}
        </say-as>
        </speak>`);
    }

    // start everything!!
    listen() {
        // register intents and start server
        this.agent.welcome(this.welcomeIntent.bind(this));
        this.agent.intent(ActionServer.intent.action.TEXT, this.textIntent.bind(this));
        this.agent.intent('my.deeplink.intent', this.dateIntent.bind(this));
        this.agent.listen();
    }
}
// instantiate
(new MyAction()).listen();