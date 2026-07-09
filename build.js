import { existsSync, mkdirSync, cpSync, rmSync } from 'node:fs';

const files = ['index.html', 'style.css', 'script.js', 'data.js', 'profile.webp'];

if (existsSync('dist')) rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
for (const file of files) {
  cpSync(file, `dist/${file}`);
}
