var fs = require('fs');
var path = require('path');
var ngrok = require('./get_public_url');
const actionConfigFile = path.resolve(__dirname, '..', 'action.json');
var actionConfig = fs.readFileSync(actionConfigFile, 'utf-8');

module.exports.updateConfig = function() {

    return ngrok.getPublicUrl().then(public_url => {

        if (actionConfig) {
            actionConfig = actionConfig.replace(/https:\/\/[a-z0-9]+\.ngrok.io/, public_url);

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