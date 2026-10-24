import {readFile,writeFile,copyFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
if(!process.argv[2])throw new Error('Usage: node sync-registry.mjs <Light registry directory>');
const registry=pathToFileURL(resolve(process.argv[2])+'/');
const root=new URL('./',import.meta.url);
const index=JSON.parse(await readFile(new URL('index.json',registry),'utf8'));
await mkdir(new URL('dist/assets/modules/',root),{recursive:true});
for(const m of index.modules){
  if(!/^[a-z0-9-]+$/.test(m.id))throw new Error('Invalid module ID');
  await copyFile(new URL('modules/'+m.id+'/cover.png',registry),new URL('dist/assets/modules/'+m.id+'.png',root));
}
await writeFile(new URL('src/registry-index.json',root),JSON.stringify(index,null,2)+'\n');
console.log('Imported '+index.modules.length+' module records and covers. Run npm run build.');
