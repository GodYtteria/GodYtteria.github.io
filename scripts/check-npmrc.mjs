import { execFileSync } from 'node:child_process';

const value = execFileSync('npm', ['config', 'get', 'ignore-scripts'], { encoding: 'utf8' }).trim();

if (value !== 'true') {
	console.error(`ignore-scripts is ${value}, expected true — npm install scripts are not blocked`);
	process.exit(1);
}

console.log('ignore-scripts: true');
