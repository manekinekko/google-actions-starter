const fs = require('fs');
const path = require('path');
const ngrok = require('./get_public_url');
const actionConfigFile = path.resolve(__dirname, '..', 'action.json');
let actionConfig = fs.readFileSync(actionConfigFile, 'utf-8');
const args = process.argv;

if (args[2] && args[2] === '-f') {
    updateConfig();
}

function updateConfig() {

    return ngrok.getPublicUrl().then(public_url => {

        if (actionConfig) {
            actionConfig = actionConfig.replace(/https:\/\/[a-z0-9]+\.ngrok.io/g, public_url);

            fs.writeFileSync(actionConfigFile, actionConfig, {
                encoding: 'utf-8'
            });

            console.log('GAS: set the new public_url to"', public_url, '"in your "', actionConfigFile, '" file.');

            return JSON.parse(actionConfig);

        } else {
            console.log('GAS: no actions.json file found at "', actionConfigFile, '"');
        }

    }).catch(error => {
        console.log('GAS: can not connect to ngrok server. Is it running?');
        console.error(error);
        process.extit(1);
    })

};

module.exports.updateConfig = updateConfig;