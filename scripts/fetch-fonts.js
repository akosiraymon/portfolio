import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const directory = join(root,'assets/fonts');
await mkdir(directory,{recursive:true});
for (const family of ['Archivo','Inter']) {
  const response = await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@100..900&display=swap`,{headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'}});
  if (!response.ok) throw new Error(`Font stylesheet failed: ${response.status}`);
  const css = await response.text();
  const blocks = css.split('/* latin */');
  const source = blocks.at(-1).match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/)?.[1];
  if (!source) throw new Error(`No Latin woff2 for ${family}`);
  const font = await fetch(source);
  if (!font.ok) throw new Error(`Font download failed: ${font.status}`);
  await writeFile(join(directory,`${family.toLowerCase()}-latin.woff2`),Buffer.from(await font.arrayBuffer()));
  const licenseUrl = `https://raw.githubusercontent.com/google/fonts/main/ofl/${family.toLowerCase()}/OFL.txt`;
  const license = await fetch(licenseUrl);
  if (!license.ok) throw new Error(`Font license failed: ${license.status}`);
  await writeFile(join(directory,`${family}-OFL.txt`),await license.text());
  console.log(`Downloaded ${family} Latin variable font and OFL license`);
}
