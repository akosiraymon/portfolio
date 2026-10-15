import sharp from 'sharp';
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceDirectory = join(root,'assets/projects');
const targetDirectory = join(root,'assets/optimized');
await mkdir(targetDirectory,{recursive:true});
const manifest = {};
let originalBytes = 0;
let optimizedBytes = 0;
for (const file of await readdir(sourceDirectory)) {
  if (!/\.(png|webp|jpe?g)$/i.test(file)) continue;
  const source = join(sourceDirectory,file);
  const name = basename(file,file.slice(file.lastIndexOf('.')));
  const preview = `${name}-1200.webp`;
  const thumbnail = `${name}-640.webp`;
  const previewInfo = await sharp(source).resize({width:1200,withoutEnlargement:true}).webp({quality:85,effort:6}).toFile(join(targetDirectory,preview));
  const thumbInfo = await sharp(source).resize({width:640,withoutEnlargement:true}).webp({quality:82,effort:6}).toFile(join(targetDirectory,thumbnail));
  manifest[`/assets/projects/${file}`] = {preview:`/assets/optimized/${preview}`,thumbnail:`/assets/optimized/${thumbnail}`,width:previewInfo.width,height:previewInfo.height,thumbnailWidth:thumbInfo.width};
  originalBytes += (await stat(source)).size;
  optimizedBytes += previewInfo.size;
}
await writeFile(join(root,'assets/image-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
const social = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f7f6f2"/><path d="M70 82h40" stroke="#0f766e" stroke-width="3"/><text x="130" y="89" font-family="Arial" font-size="20" letter-spacing="3" fill="#535c56">RAYMON CASTANO / AUTOMATION SPECIALIST</text><text x="70" y="250" font-family="Arial" font-size="80" font-weight="bold" letter-spacing="-3" fill="#202421">Less busywork.</text><text x="70" y="350" font-family="Arial" font-size="80" font-weight="bold" letter-spacing="-3" fill="#0f766e">More possibility.</text><path d="M70 455h1060" stroke="#d6dad1"/><text x="70" y="530" font-family="Arial" font-size="25" fill="#535c56">Automation systems · AI agents · Connected tools</text><text x="70" y="580" font-family="Arial" font-size="20" fill="#0f766e">raymoncastano.com</text></svg>');
await sharp(social).png().toFile(join(root,'assets/social-preview.png'));
console.log(JSON.stringify({images:Object.keys(manifest).length,originalBytes,optimizedPreviewBytes:optimizedBytes,reduction:Math.round((1-optimizedBytes/originalBytes)*100)+'%'}));
