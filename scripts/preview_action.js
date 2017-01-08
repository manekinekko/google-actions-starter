const exec = require('child_process').execSync;
const config = require('./update_action_config');

// config.updateConfig().then(actionConfig => {
//     // here you have access to the update to date action config (with the right ngrok URL)
// });

exec(`gactions preview --action_package action.json --invocation_name 'my first action' --preview_mins 1234`, { stdio: [0, 1, 2] });