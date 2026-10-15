import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync, watch } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, extname, sep } from 'node:path';
import { build } from './build.js';
import { execFileSync } from 'node:child_process';

const root = dirname(fileURLToPath(import.meta.url));
const directory = resolve(root,'dist');
const port = Number(process.env.PORT || 4173);
const development = process.argv.includes('--watch');
if (development || !existsSync(resolve(directory,'index.html'))) build();
const contentTypes = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
const server = createServer((request,response) => {
  if (!['GET','HEAD'].includes(request.method)) {response.writeHead(405);response.end();return;}
  let pathname;
  try {pathname = decodeURIComponent(new URL(request.url,'http://127.0.0.1').pathname);} catch {response.writeHead(400);response.end();return;}
  let path = resolve(directory,`.${pathname}`);
  if (path !== directory && !path.startsWith(directory+sep)) {response.writeHead(403);response.end();return;}
  if (existsSync(path) && statSync(path).isDirectory()) path = resolve(path,'index.html');
  if (!existsSync(path) || !statSync(path).isFile()) {response.writeHead(404,{'Content-Type':'text/plain'});response.end('Not found');return;}
  response.writeHead(200,{'Content-Type':contentTypes[extname(path)] || 'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
  if (request.method === 'HEAD') {response.end();return;}
  createReadStream(path).pipe(response);
});
server.listen(port,'127.0.0.1',() => console.log(`Portfolio preview: http://127.0.0.1:${port} (contact submissions are simulated)`));
server.on('error',(error) => {console.error(error.message);process.exitCode=1;});
if (development) {
  let timer;
  watch(root,{recursive:true},(_event,filename) => {
    if (!filename || /^(dist|node_modules|artifacts|\.git)[\\/]/.test(filename)) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {execFileSync(process.execPath,[resolve(root,'build.js')],{stdio:'inherit',windowsHide:true});console.log('Updated preview. Refresh the browser to see changes.');} catch(error) {console.error(error.message);}
    },150);
  });
}
