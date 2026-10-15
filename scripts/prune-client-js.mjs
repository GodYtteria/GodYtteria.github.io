import { existsSync, globSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const build = 'build';
const dirs = ['_app/immutable/chunks', '_app/immutable/entry', '_app/immutable/nodes'];

const html = globSync(`${build}/**/*.html`);
if (!html.length) {
	console.error(`no HTML in ${build}/ — refusing to prune a build that did not happen`);
	process.exit(1);
}

const referenced = html.filter((f) => /_app\/immutable\/[a-z]+\/[^"']+\.js/.test(readFileSync(f, 'utf8')));

if (referenced.length) {
	console.error(`client JS is still referenced by:\n  ${referenced.join('\n  ')}`);
	process.exit(1);
}

let removed = 0;
for (const dir of dirs) {
	const path = join(build, dir);
	if (existsSync(path)) {
		removed += globSync(`${path}/**/*.js`).length;
		rmSync(path, { recursive: true });
	}
}

let stripped = 0;
for (const f of html) {
	const before = readFileSync(f, 'utf8');
	const after = before.replace(/<!--[\s\S]*?-->/g, '');
	if (after !== before) {
		writeFileSync(f, after);
		stripped++;
	}
}

console.log(`pruned ${removed} unused client JS files and the hydration comments in ${stripped} pages from ${build}`);
