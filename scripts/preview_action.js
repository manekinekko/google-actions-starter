const exec = require('child_process').execSync;
const config = require('./update_action_config');

// config.updateConfig().then(actionConfig => {

// });

exec(`gactions --verbose preview --action_package action.json --invocation_name 'my first action' --preview_mins 1234`, { stdio: [0, 1, 2] });