const { execSync } = require('child_process');
const environment = process.env.ENVIRONMENT || 'development';

if (environment === 'production') {
    execSync('NODE_ENV=production npx webpack --config webpack.config.js --mode production', { stdio: 'inherit' });
} else {
    execSync('NODE_ENV=development npx webpack --config webpack.config.js --mode development', { stdio: 'inherit' });
}
