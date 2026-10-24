import {readFile,access} from 'node:fs/promises';
import {createRequire} from 'node:module';
const root=new URL('./dist/',import.meta.url),origin='https://getlight.sherhn.space';
const sharp=createRequire(import.meta.url)('sharp');
const pages=['index.html','modules/index.html','features/index.html','designs/index.html','en/index.html','en/modules/index.html','en/features/index.html','en/designs/index.html'];
const titles=new Set();let links=0;
const assert=(condition,message)=>{if(!condition)throw new Error(message)};
for(const file of pages){
 const html=await readFile(new URL(file,root),'utf8');
 const english=file.startsWith('en/'),lang=english?'en':'ru',page=file.includes('modules/')?'modules':file.includes('features/')?'features':file.includes('designs/')?'designs':'home';
 const canonical=origin+'/'+file.replace(/index.html$/,'');
 assert(html.includes('<html lang="'+lang+'"'),file+': wrong language');
 const title=html.match(/<title>([^<]+)<\/title>/)?.[1];assert(title&&!titles.has(title),file+': title missing/duplicate');titles.add(title);
 assert((html.match(/<h1[ >]/g)||[]).length===1,file+': expected one H1');
 assert(html.includes('rel="canonical" href="'+canonical+'"'),file+': wrong canonical');
 for(const l of ['ru','en','x-default'])assert(html.includes('hreflang="'+l+'"'),file+': missing alternate '+l);
 for(const name of ['description','twitter:card','twitter:title','twitter:description','twitter:image','twitter:image:alt'])assert(html.includes('name="'+name+'" content="'),file+': missing '+name);
 for(const name of ['og:title','og:type','og:url','og:locale','og:description','og:image','og:image:alt','og:image:width','og:image:height'])assert(html.includes('property="'+name+'" content="'),file+': missing '+name);
 const json=html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];assert(json,file+': no JSON-LD');JSON.parse(json);
 assert(html.includes('mailto:sherhn.inc@gmail.com'),file+': missing contact');
 assert(!html.includes('href="https://light-ide-workspace'),file+': stale SEO origin');
 if(page==='designs')assert(html.includes('noindex,follow'),file+': draft must be noindex');
 if(page==='modules'){
  assert((html.match(/data-module data-category=/g)||[]).length===9,file+': expected 9 modules');
  const index=JSON.parse(await readFile(new URL('src/registry-index.json',import.meta.url),'utf8'));
  for(const m of index.modules)assert(html.includes('id="'+m.id+'"')&&html.includes('v'+m.version),file+': registry mismatch '+m.id);
 }
 const image=await sharp(new URL('assets/og-'+page+'-'+lang+'.png',root).pathname.replace(/^\/([A-Za-z]:)/,'$1')).metadata();
 assert(image.width===1200&&image.height===630,file+': invalid social image dimensions');
 for(const match of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)){
  const href=match[1].split('#')[0].split('?')[0];if(!href.startsWith('/'))continue;
  await access(new URL('.'+(href.endsWith('/')?href+'index.html':href),root));links++;
 }
}
const sitemap=await readFile(new URL('sitemap.xml',root),'utf8');assert((sitemap.match(/<loc>/g)||[]).length===6,'Sitemap must contain 6 production URLs');assert(!sitemap.includes('designs'),'Draft designs leaked into sitemap');
const robots=await readFile(new URL('robots.txt',root),'utf8');assert(robots.includes('Sitemap: '+origin+'/sitemap.xml'),'Sitemap not declared');
console.log('PASS: 8 static localized pages, 8 social images, '+links+' internal resource/link targets, structured data, 9 real modules, sitemap and robots.');

assert((await readFile(new URL('CNAME',root),'utf8')).trim()==='getlight.sherhn.space','Incorrect Pages domain');
await access(new URL('.nojekyll',root));
console.log('PASS: GitHub Pages CNAME and .nojekyll.');
