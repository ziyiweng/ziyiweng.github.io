import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destination = path.join(siteRoot, 'src/content/blog');
const defaultSource = path.resolve(siteRoot, '../ziyiweng-blog-content/published');
const source = path.resolve(process.env.BLOG_CONTENT_PUBLISHED || defaultSource);

if (source.split(path.sep).includes('drafts')) {
	console.error(`Refusing to sync from a drafts path: ${source}`);
	process.exit(1);
}

if (!fs.existsSync(source) || !fs.statSync(source).isDirectory()) {
	console.error(`Published content directory not found: ${source}`);
	console.error('Set BLOG_CONTENT_PUBLISHED or place the private repository at ../ziyiweng-blog-content.');
	process.exit(1);
}

fs.mkdirSync(destination, { recursive: true });

for (const entry of fs.readdirSync(destination)) {
	if (entry === '.gitkeep') continue;
	fs.rmSync(path.join(destination, entry), { recursive: true, force: true });
}

fs.cpSync(source, destination, {
	recursive: true,
	filter(entryPath) {
		const base = path.basename(entryPath);
		return base !== '.git' && base !== '.DS_Store' && base !== '.gitkeep';
	},
});

const copied = [];
for (const entry of fs.readdirSync(destination, { recursive: true })) {
	const relative = entry.toString();
	if (relative.split(path.sep).includes('drafts')) {
		console.error(`Draft file was copied into the website: ${relative}`);
		process.exit(1);
	}
	if (relative === '.gitkeep') continue;
	const full = path.join(destination, relative);
	if (fs.statSync(full).isFile()) copied.push(relative);
}

console.log(`Synced ${copied.length} published file(s) from ${source}`);
